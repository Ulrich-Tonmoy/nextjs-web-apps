"use client";

import styles from "../styles";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";
import { ExploreCard, TitleText, TypingText } from "../components";
import { exploreWorlds } from "./../constants";
import { useState } from "react";

const Explore = () => {
    const [active, setActive] = useState("world-2");

    return (
        <section className={`${styles.paddings}`} id="explore">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className={`${styles.innerWidth} mx-auto flex flex-col`}
            >
                <TypingText title="| The World" textStyles="text-center" />
                <TitleText
                    title={
                        <>
                            Choose the world you want <br className="hidden md:block" /> to explore
                        </>
                    }
                    textStyles="text-center"
                />
                <div className="mt-[50px] flex lg:flex-row lg:w-[1450px] flex-col min-h-[70vh] gap-5">
                    {exploreWorlds.map((world, index) => (
                        <ExploreCard
                            key={world.id}
                            {...world}
                            index={index}
                            active={active}
                            handleClick={setActive}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Explore;
