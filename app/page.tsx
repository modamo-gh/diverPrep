"use client";

import FactionSelector from "@/components/FactionSelector";
import SectionHeader from "@/components/SectionHeader";
import { Enemy } from "@/types/Enemy";
import { Weapon } from "@/types/Weapon";
import Image from "next/image";
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
					<SectionHeader name={"Enemy"}/>
					<div className="bg-red-500 flex flex-col flex-[4] items-center justify-center w-full">
						<FactionSelector
							factionIndex={factionIndex}
							factions={factions}
							setEnemyIndex={setEnemyIndex}
							setFactionIndex={setFactionIndex}
						/>
						<div className="flex flex-row flex-1">
							<button
								onClick={() =>
									setEnemyIndex((prevIndex) =>
										prevIndex === 0
											? filteredEnemies.length - 1
											: prevIndex - 1
									)
								}
							>
								Previous
							</button>
							<div className="flex flex-col flex-1 items-center justify-center">
								<Image
									alt={filteredEnemies[enemyIndex]?.name}
									className="h-64 object-contain w-64 "
									src={filteredEnemies[enemyIndex]?.image_url}
								/>
								<p>{filteredEnemies[enemyIndex]?.name}</p>
								<p>
									Max Armor Value:{" "}
									{filteredEnemies[enemyIndex]?.max}
								</p>
								<p>
									Most Common Armor Value:{" "}
									{filteredEnemies[enemyIndex]?.mode}
								</p>
								<p>
									Rounded Average Weighted Armor Value:{" "}
									{
										filteredEnemies[enemyIndex]
											?.weightedaverage
									}
								</p>
							</div>
							<button
								onClick={() =>
									setEnemyIndex((prevIndex) =>
										prevIndex === filteredEnemies.length - 1
											? 0
											: prevIndex + 1
									)
								}
							>
								Next
							</button>
						</div>
					</div>
				</div>
				<div className="flex flex-col flex-1 justify-center">
					<SectionHeader name={"Weapon"}/>
					<div className="bg-blue-500 flex flex-row flex-[4] items-center justify-center w-full">
						<button
							onClick={() =>
								setWeaponIndex((prevIndex) =>
									prevIndex === 0
										? weapons.length - 1
										: prevIndex - 1
								)
							}
						>
							Previous
						</button>
						<div className="flex flex-col flex-1 items-center justify-center">
							<Image
								alt={weapons[weaponIndex]?.name}
								className="h-64 object-contain w-64"
								src={weapons[weaponIndex]?.image_url}
							/>
							<p>{weapons[weaponIndex]?.name}</p>
							<p>
								Max Penetration:{" "}
								{weapons[weaponIndex]?.penetration}
							</p>
						</div>
						<button
							onClick={() =>
								setWeaponIndex((prevIndex) =>
									prevIndex === weapons.length - 1
										? 0
										: prevIndex + 1
								)
							}
						>
							Next
						</button>
					</div>
				</div>
			</div>
			<div className="flex flex-1 items-center justify-around">
				<p>
					Max Armor Value?{" "}
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.max
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
					Rounded Average Weighted Armor Value?{" "}
					{weapons[weaponIndex]?.penetration >=
					filteredEnemies[enemyIndex]?.weightedaverage
						? "✅"
						: "❌"}
				</p>
			</div>
		</main>
	);
};

export default Home;
