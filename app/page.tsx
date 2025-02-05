"use client";

import Section from "@/components/Section";
import SocialFooter from "@/components/SocialFooter";
import TacticalAssessment from "@/components/TacticalAssessment";
import { Enemy } from "@/types/Enemy";
import { SectionType } from "@/types/SectionType";
import { Weapon } from "@/types/Weapon";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
	const [categories, setCategories] = useState<string[]>([]);
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [enemies, setEnemies] = useState<Enemy[]>([]);
	const [enemyIndex, setEnemyIndex] = useState(0);
	const [expandedSection, setExpandedSection] = useState<SectionType | null>(
		null
	);
	const [factions, setFactions] = useState<string[]>([]);
	const [factionIndex, setFactionIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [weaponIndex, setWeaponIndex] = useState(0);
	const [weapons, setWeapons] = useState<Weapon[]>([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const [enemiesRes, weaponsRes] = await Promise.all([
					fetch("/api/enemies"),
					fetch("/api/weapons")
				]);

				const [enemies, weapons]: [Enemy[], Weapon[]] =
					await Promise.all([enemiesRes.json(), weaponsRes.json()]);

				setEnemies(enemies);
				setWeapons(weapons);
				setFactions([
					...new Set(enemies.map((enemy) => enemy.faction))
				]);
				setCategories([
					...new Set(weapons.map((weapon) => weapon.category))
				]);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		getData();
	}, []);

	const enemySubset = enemies.filter(
		(enemy) => enemy.faction === factions[factionIndex]
	);

	const toggleSection = (section: SectionType) => {
		if (expandedSection !== section) {
			setExpandedSection(section);
		}
	};

	const weaponSubset = weapons.filter(
		(weapon) => weapon.category === categories[categoryIndex]
	);

	return loading ? (
		<main className="bg-gray-900 flex gap-2 p-2 h-screen w-screen">
			<div className="bg-gray-800 border border-gray-600 flex flex-1 items-center justify-center">
				<Image
					alt={"Helldivers Logo"}
					className="animate-pulse"
					height={200}
					src={"/favicon.png"}
					width={200}
				/>
			</div>
		</main>
	) : (
		<main className="animate-fadeIn bg-gray-900 flex flex-col gap-2 p-2 h-screen w-screen">
			<div className="flex-1 gap-2 grid grid-cols-1 md:grid-cols-2 rounded">
				<Section
					entitySubset={enemySubset}
					entitySubsetIndex={enemyIndex}
					expandedSection={expandedSection}
					name="enemy"
					setSubsetIndex={setFactionIndex}
					setSupersetIndex={setEnemyIndex}
					subset={factions}
					subsetIndex={factionIndex}
					toggleSection={toggleSection}
				/>
				<Section
					entitySubset={weaponSubset}
					entitySubsetIndex={weaponIndex}
					expandedSection={expandedSection}
					name="weapon"
					setSubsetIndex={setCategoryIndex}
					setSupersetIndex={setWeaponIndex}
					subset={categories}
					subsetIndex={categoryIndex}
					toggleSection={toggleSection}
				/>
				<TacticalAssessment
					enemyIndex={enemyIndex}
					expandedSection={expandedSection}
					enemySubset={enemySubset}
					toggleSection={toggleSection}
					weaponIndex={weaponIndex}
					weaponSubset={weaponSubset}
				/>
			</div>
			<SocialFooter />
		</main>
	);
};

export default Home;
