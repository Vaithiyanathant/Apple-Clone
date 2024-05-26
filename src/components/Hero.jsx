/** @format */
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";
import { useState } from "react";
import { useEffect } from "react";
const Hero = () => {
	const [videoSrc, setVideoSrc] = useState(
		window.innerWidth < 760 ? smallHeroVideo : heroVideo
	);

	const handleVideoSrcSet = () => {
		if (window.innerWidth < 700) {
			setVideoSrc(smallHeroVideo);
		} else {
			setVideoSrc(heroVideo);
		}
	};

	// to dynamically render that vide for small and large device render it
	useEffect(() => {
		window.addEventListener("resize", handleVideoSrcSet);
		return () => {
			window.removeEventListener("resize", handleVideoSrcSet);
		};
	}, []);

	// animations using gsap
	useGSAP(() => {
		gsap.to("#hero", { opacity: 1, delay: 2 });
		gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
	}, []);

	return (
		<section className='w-full nav-height bg-black relative'>
			<div className='h-5/6 w-full flex flex-col justify-center items-center'>
				<p
					id='hero'
					className='text-white hero-title'>
					iPhone 15 Pro
				</p>
				<div className='md:w-10/12 w-9/12'>
					<video
						className='pointer-events-none'
						autoPlay
						muted
						playsInline
						key={videoSrc}>
						<source
							src={videoSrc}
							type='video/mp4'></source>
					</video>
				</div>
			</div>
			<div
				id='cta'
				className='flex flex-col items-center opacity-0 translate-y-20'>
				<a
					href='#highlights'
					className='btn'>
					buy
				</a>
				<p className='font-normal text-xl'>From $199/month or $999</p>
			</div>
		</section>
	);
};
export default Hero;
