"use client";

import React, { useEffect, useState } from "react";
import styles from "./AnimatedBackground.module.css";

const AnimatedBackground: React.FC = () => {
  const [groups, setGroups] = useState<any[]>([]);

  const groupCount = 4;
  const groupFadeDuration = 4 * 1000; // seconds fade-in/fade-out duration
  const staggerInterval = groupFadeDuration / groupCount;
  const flickerInterval = 250; // Flicker every 500 ms

  const generateGroup = (index: number) => {
    const groupSize = Math.floor(Math.random() * 10) + 20; // 20-29 squares
    const squares = Array.from({ length: groupSize }, () => ({
      fill: Math.random() > 0.7,
      unshown: Math.random() > 0.7,
    }));
    return {
      x: Math.random() * 100,
      y: (Math.random() * 50) / groupCount + (100 * index) / groupCount,
      squares,
      visible: true,
    };
  };

  const toggleSquareFill = (groupIndex: number) => {
    setGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      const group = updatedGroups[groupIndex];
      group.squares.forEach((square: any) => {
        if (Math.random() > 0.98) {
          // 1 - chance to change fill state
          square.fill = !square.fill;
        }
      });
      return updatedGroups;
    });
  };

  const fadeInAndOutGroup = (index: number) => {
    setGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      updatedGroups[index].visible = false;
      return updatedGroups;
    });

    setTimeout(() => {
      setGroups((prevGroups) => {
        const updatedGroups = [...prevGroups];
        updatedGroups[index] = generateGroup(index);
        updatedGroups[index].visible = true;
        return updatedGroups;
      });

      setTimeout(() => fadeInAndOutGroup(index), groupFadeDuration);
    }, groupFadeDuration);
  };

  useEffect(() => {
    const initialGroups = Array.from({ length: groupCount }, (_, index) =>
      generateGroup(index)
    );
    setGroups(initialGroups);

    initialGroups.forEach((_, index) => {
      setTimeout(() => fadeInAndOutGroup(index), staggerInterval * index);
      setInterval(() => toggleSquareFill(index), flickerInterval);
    });
  }, []);

  return (
    <div
      className={"absolute w-screen h-screen overflow-hidden"}
      style={{ background: `${process.env.NEXT_PUBLIC_COLOR_SPECIALPAGESBG}` }}
    >
      {groups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className={`${styles.group} ${
            group.visible ? styles.visible : styles.hidden
          }`}
          style={{
            top: `${group.y}%`,
            left: `${group.x}%`,
          }}
        >
          {group.squares.map((square: any, squareIndex: number) => (
            <div
              key={squareIndex}
              className={`${styles.square} ${
                square.fill ? styles.filled : ""
              } ${square.unshown ? styles.unshown : ""}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
