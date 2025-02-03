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
import { Weapon } from "@/types/Weapon";
import { useEffect, useState } from "react";

const Home = () => {
	const [categories, setCategories] = useState<string[]>([]);
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [enemies, setEnemies] = useState<Enemy[]>([]);
	const [enemyIndex, setEnemyIndex] = useState(0);
	const [factions, setFactions] = useState<string[]>([]);
	const [factionIndex, setFactionIndex] = useState(0);
	const [weaponIndex, setWeaponIndex] = useState(0);
	const [weapons, setWeapons] = useState<Weapon[]>([]);

	useEffect(() => {
		setWeaponIndex(0);
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

	return (
		<main className="bg-gray-900 flex flex-col gap-2 h-screen min-h-0 overflow-hidden p-2 text-white w-screen">
			<div className="flex flex-col flex-1 gap-2">
				<div className="flex-1 gap-2 grid grid-cols-2 rounded">
					<div className="flex flex-col gap-2 h-full">
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
					<div className="flex flex-col gap-2 h-full">
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
				<TacticalAssessment
					enemyIndex={enemyIndex}
					filteredEnemies={filteredEnemies}
					weaponIndex={weaponIndex}
					weapons={weapons}
				/>
			</div>
			<SocialFooter />
		</main>
	);
};

export default Home;
