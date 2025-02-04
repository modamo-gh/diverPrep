"use client";

import SectionHeader from "@/components/SectionHeader";
import CategorySelector from "@/components/selectors/Category";
import EnemySelector from "@/components/selectors/Enemy";
import FactionSelector from "@/components/selectors/Faction";
import WeaponSelector from "@/components/selectors/Weapon";
import SocialFooter from "@/components/SocialFooter";
import EnemyStats from "@/components/stats/Enemy";
import WeaponStats from "@/components/stats/Weapon";
import TacticalAssessment from "@/components/TacticalAssessment";
import { Enemy } from "@/types/Enemy";
import { Section } from "@/types/Section";
import { Weapon } from "@/types/Weapon";
import { useEffect, useState } from "react";

const Home = () => {
	const [categories, setCategories] = useState<string[]>([]);
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [enemies, setEnemies] = useState<Enemy[]>([]);
	const [enemyIndex, setEnemyIndex] = useState(0);
	const [expandedSection, setExpandedSection] = useState<Section | null>(
		null
	);
	const [factions, setFactions] = useState<string[]>([]);
	const [factionIndex, setFactionIndex] = useState(0);
	const [weaponIndex, setWeaponIndex] = useState(0);
	const [weapons, setWeapons] = useState<Weapon[]>([]);

	useEffect(() => {
		fetch("/api/enemies")
			.then((res) => res.json())
			.then((data: Enemy[]) => {
				setEnemies(data);
				setFactions([...new Set(data.map((enemy) => enemy.faction))]);
			})
			.catch((error) => console.error("Error fetching enemies:", error));

		fetch("/api/weapons")
			.then((res) => res.json())
			.then((data: Weapon[]) => {
				setWeapons(data);
				setCategories([
					...new Set(data.map((weapon) => weapon.category))
				]);
			})
			.catch((error) => console.error("Error fetching weapons:", error));
	}, []);

	const filteredWeapons = weapons.filter(
		(weapon) => weapon.category === categories[categoryIndex]
	);

	const filteredEnemies = enemies.filter(
		(enemy) => enemy.faction === factions[factionIndex]
	);

	const toggleSection = (section: Section) => {
		setExpandedSection((prev) => (prev === section ? null : section));
		console.log(expandedSection);
	};

	return (
		<main className="bg-gray-900 flex flex-col gap-2 h-screen min-h-0 overflow-hidden p-2 text-white w-screen">
			<div className="flex flex-col flex-1 gap-2">
				<div
					className={`flex flex-col ${
						expandedSection === "enemy" ||
						expandedSection === "weapon"
							? "flex-[9] md:flex-1"
							: "flex-[2] md:flex-1"
					} gap-2 md:flex-row md:grid-cols-2 md:grid-rows-1 rounded transition-all duration-300 ease-in-out`}
				>
					<div
						className={`flex flex-col gap-2 ${
							expandedSection === "enemy"
								? "flex-[8]"
								: "flex-[1]"
						} transition-all duration-300 ease-in-out`}
						onClick={() => toggleSection("enemy")}
					>
						<SectionHeader name={"Enemy"} />
						<FactionSelector
							factionIndex={factionIndex}
							factions={factions}
							setEnemyIndex={setEnemyIndex}
							setFactionIndex={setFactionIndex}
						/>
						<EnemySelector
							enemyIndex={enemyIndex}
							filteredEnemies={filteredEnemies}
							setEnemyIndex={setEnemyIndex}
						/>
						<EnemyStats
							enemyIndex={enemyIndex}
							filteredEnemies={filteredEnemies}
						/>
					</div>
					<div
						className={`flex flex-col gap-2 ${
							expandedSection === "weapon"
								? "flex-[8]"
								: "flex-[1]"
						} transition-all duration-300 ease-in-out`}
						onClick={() => toggleSection("weapon")}
					>
						<SectionHeader name={"Weapon"} />
						<CategorySelector
							categories={categories}
							categoryIndex={categoryIndex}
							setCategoryIndex={setCategoryIndex}
							setWeaponIndex={setWeaponIndex}
						/>
						<WeaponSelector
							setWeaponIndex={setWeaponIndex}
							weaponIndex={weaponIndex}
							filteredWeapons={filteredWeapons}
						/>
						<WeaponStats
							weaponIndex={weaponIndex}
							filteredWeapons={filteredWeapons}
						/>
					</div>
				</div>
				<div
					className={`flex ${
						expandedSection === "assessment"
							? "flex-[8]"
							: "flex-[1]"
					} md:flex-none flex-row transition-all duration-300 ease-in-out`}
					onClick={() => toggleSection("assessment")}
				>
					<div className="flex flex-1 md:hidden ">
						<SectionHeader name="Assessment" />
					</div>
					<TacticalAssessment
						enemyIndex={enemyIndex}
						filteredEnemies={filteredEnemies}
						weaponIndex={weaponIndex}
						weapons={weapons}
					/>
				</div>
			</div>
			<SocialFooter />
		</main>
	);
};

export default Home;
