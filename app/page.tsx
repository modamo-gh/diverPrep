"use client";

import SectionHeader from "@/components/SectionHeader";
import EnemySelector from "@/components/selectors/Enemy";
import FactionSelector from "@/components/selectors/Faction";
import WeaponSelector from "@/components/selectors/Weapon";
import EnemyStats from "@/components/stats/Enemy";
import WeaponStats from "@/components/stats/Weapon";
import TacticalAssessment from "@/components/TacticalAssessment";
import { Enemy } from "@/types/Enemy";
import { Weapon } from "@/types/Weapon";
import { useEffect, useState } from "react";

const Home = () => {
	const [enemies, setEnemies] = useState<Enemy[]>([]);
	const [enemyIndex, setEnemyIndex] = useState(0);
	const [factions, setFactions] = useState<string[]>([]);
	const [factionIndex, setFactionIndex] = useState(0);
	const [weaponIndex, setWeaponIndex] = useState(0);
	const [weapons, setWeapons] = useState<Weapon[]>([]);

	useEffect(() => {
		setEnemyIndex(0);
		setFactionIndex(0);
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
			.then((data) => setWeapons(data))
			.catch((error) => console.error("Error fetching weapons:", error));
	}, []);

	const filteredEnemies = enemies.filter(
		(enemy) => enemy.faction === factions[factionIndex]
	);

	return (
		<main className="bg-gray-900 flex flex-col h-screen overflow-hidden text-white w-screen">
			<div className="flex-[4] gap-4 grid grid-cols-2 p-6">
				<div className="bg-red-500 flex flex-col">
					<SectionHeader name={"Enemy"} />
					<div className="bg-yellow-500 flex flex-[4] relative w-full">
						<FactionSelector
							factionIndex={factionIndex}
							factions={factions}
							setEnemyIndex={setEnemyIndex}
							setFactionIndex={setFactionIndex}
						/>
						<div className="bg-blue-500 flex flex-col flex-1">
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
					</div>
				</div>
				<div className="bg-blue-500 flex flex-col">
					<SectionHeader name={"Weapon"} />
					<div className="bg-red-500 flex flex-col flex-[4]">
						<WeaponSelector
							setWeaponIndex={setWeaponIndex}
							weaponIndex={weaponIndex}
							weapons={weapons}
						/>
						<WeaponStats
							weaponIndex={weaponIndex}
							weapons={weapons}
						/>
					</div>
				</div>
			</div>
			<TacticalAssessment
				enemyIndex={enemyIndex}
				filteredEnemies={filteredEnemies}
				weaponIndex={weaponIndex}
				weapons={weapons}
			/>
		</main>
	);
};

export default Home;
