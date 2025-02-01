"use client";

import { useEffect, useState } from "react";

type Enemy = {
	id: number;
	name: string;
	image_url: string;
};

const Home = () => {
	const [enemies, setEnemies] = useState<Enemy[]>([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		fetch("/api/enemies")
			.then((res) => res.json())
			.then((data) => setEnemies(data))
			.catch((error) => console.error("Error fetching enemies:", error));
	}, []);

	return (
		<main className="bg-gray-500 divide-black divide-x flex flex-row h-screen w-screen">
			<div className="bg-blue-500 flex flex-col flex-1 items-center justify-center pt-6 text-4xl">
				<h1 className="text-black">Enemy</h1>
				<div className="bg-red-500 flex flex-col flex-1 items-center justify-center w-full">
					<button
						onClick={() => {
							if (index - 1 < 0) {
								setIndex(enemies.length - 1);
							} else {
								setIndex(index - 1);
							}
						}}
					>
						Previous
					</button>
					<div className="flex flex-col flex-1 items-center justify-center">
						<img
							src={enemies[index]?.image_url}
							alt={enemies[index]?.name}
						/>
						<p>{enemies[index]?.name}</p>
					</div>
					<button
						onClick={() => {
							if (index + 1 === enemies.length) {
								setIndex(0);
							} else {
								setIndex(index + 1);
							}
						}}
					>
						Next
					</button>
				</div>
			</div>
			<div className="flex flex-1 justify-center pt-6 text-4xl">
				<h1 className="text-black">Weapon</h1>
			</div>
		</main>
	);
};

export default Home;
