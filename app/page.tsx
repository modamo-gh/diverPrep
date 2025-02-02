"use client";

import { useEffect, useState } from "react";

type Enemy = {
	faction: string;
	id: number;
	image_url: string;
	name: string;
};

type Weapon = {
	id: number;
	image_url: string;
	name: string;
	penetration: number;
};

const Home = () => {
	const [enemies, setEnemies] = useState<Enemy[]>([]);
	const [weapons, setWeapons] = useState<Weapon[]>([]);
	const [enemyIndex, setEnemyIndex] = useState(0);
	const [weaponIndex, setWeaponIndex] = useState(0);

	useEffect(() => {
		fetch("/api/enemies")
			.then((res) => res.json())
			.then((data) => setEnemies(data))
			.catch((error) => console.error("Error fetching enemies:", error));

		fetch("/api/weapons")
			.then((res) => res.json())
			.then((data) => setWeapons(data))
			.catch((error) => console.error("Error fetching weapons:", error));
	}, []);

	const factions = [...new Set(enemies.map((enemy) => enemy.faction))];

	const [factionIndex, setFactionIndex] = useState(0);

	const filteredEnemies = enemies.filter(
		(enemy) => enemy.faction === factions[factionIndex]
	);

	return (
		<main className="bg-gray-500 divide-black divide-x flex flex-row h-screen w-screen">
			<div className="flex flex-col flex-1 items-center justify-center">
				<div className="bg-blue-500 flex flex-col flex-1 items-center justify-center w-full">
					<h1 className="flex-1 text-black">Enemy</h1>
					<div className="flex flex-row flex-1 w-full">
						<h2 className="pl-4">Faction:</h2>
						<div className="flex flex-row flex-1 justify-around">
							<button
								className="px-4"
								onClick={() => {
									setFactionIndex((prevIndex) =>
										prevIndex === 0
											? factions.length - 1
											: prevIndex - 1
									);
									setEnemyIndex(0);
								}}
							>
								{"<"}
							</button>
							<h2 className="flex-1 text-center">
								{factions[factionIndex]}
							</h2>
							<button
								className="px-4"
								onClick={() => {
									setFactionIndex((prevIndex) =>
										prevIndex === factions.length - 1
											? 0
											: prevIndex + 1
									);
									setEnemyIndex(0);
								}}
							>
								{">"}
							</button>
						</div>
					</div>
				</div>
				<div className="bg-red-500 flex flex-col flex-[4] items-center justify-center w-full">
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
						<img
							src={filteredEnemies[enemyIndex]?.image_url}
							alt={filteredEnemies[enemyIndex]?.name}
						/>
						<p>{filteredEnemies[enemyIndex]?.name}</p>
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
			<div className="flex flex-col flex-1 justify-center">
				<div className="bg-red-500 flex flex-1  items-center justify-center">
					<h1 className="text-black text-center">Weapon</h1>
				</div>
				<div className="bg-blue-500 flex flex-col flex-[4] items-center justify-center w-full">
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
						<img
							src={weapons[weaponIndex]?.image_url}
							alt={weapons[weaponIndex]?.name}
						/>
						<p>{weapons[weaponIndex]?.name}</p>
						<p>
							Max Penetration: {weapons[weaponIndex]?.penetration}
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
		</main>
	);
};

export default Home;
