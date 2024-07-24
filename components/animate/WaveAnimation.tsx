import React from "react";
import styles from "./WaveAnimation.module.css";
import { ConnectWallet } from "../connectWallet/Buttton";
const WaveAnimation = () => {
  return (
    <div className="w-full mt-20 h-[400px] md:h-full object-cover z-10 md:block">
      <div className={styles.logo_effect}>
        <div className={styles.container_pulse}>
          <div className={styles.box_pulse}>
            <div className={styles.pulse}>
              <ConnectWallet></ConnectWallet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveAnimation;
