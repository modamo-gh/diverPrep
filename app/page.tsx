"use client";

import EnemySelector from "@/components/EnemySelector";
import FactionSelector from "@/components/FactionSelector";
import SectionHeader from "@/components/SectionHeader";
import WeaponSelector from "@/components/WeaponSelector";
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
		<main className="bg-gray-500 flex flex-col h-screen w-screen">
			<div className="flex flex-row flex-[4]">
				<div className="flex flex-col flex-1 items-center justify-center">
					<SectionHeader name={"Enemy"} />
					<div className="bg-red-500 flex flex-col flex-[4] items-center justify-center w-full">
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
					</div>
				</div>
				<div className="flex flex-col flex-1 justify-center">
					<SectionHeader name={"Weapon"} />
					<WeaponSelector
						setWeaponIndex={setWeaponIndex}
						weaponIndex={weaponIndex}
						weapons={weapons}
					/>
				</div>
			</div>
			<div className="flex flex-1 items-center justify-around">
				<p>
					Rounded Average Weighted Armor Value?{" "}
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.weightedaverage
						? "✅"
						: "❌"}
				</p>
				<p>
					Most Common Armor Value?{" "}
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.mode
						? "✅"
						: "❌"}
				</p>
				<p>
					Max Armor Value?{" "}
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.max
						? "✅"
						: "❌"}
				</p>
			</div>
		</main>
	);
};

export default Home;
