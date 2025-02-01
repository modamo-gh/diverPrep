"use client";

import { useEffect, useState } from "react";

type Enemy = {
	id: number;
	name: string;
	image_url: string;
};

const Home = () => {
	const [enemies, setEnemies] = useState<Enemy[]>([]);

	useEffect(() => {
		fetch("/api/enemies")
			.then((res) => res.json())
			.then((data) => setEnemies(data))
			.catch((error) => console.error("Error fetching enemies:", error));
	}, []);

	return (
		<main className="bg-gray-500 divide-black divide-x flex flex-row h-screen w-screen">
			<div className="flex flex-col flex-1 justify-center pt-6 text-4xl">
				<h1 className="text-black">Enemies</h1>
				{enemies.map((enemy) => (
					<div key={enemy.id}>
						<img alt={enemy.name} src={enemy.image_url} />
						<h2>{enemy.name}</h2>
					</div>
				))}
			</div>
			<div className="flex flex-1 justify-center pt-6 text-4xl">
				<h1 className="text-black">Weapon</h1>
			</div>
		</main>
	);
};

export default Home;
