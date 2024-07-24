import React from 'react';
import styles from './LoginAnimation.module.css';

const LoginAnimation = () => {
  return (
    <div id="container" className={styles.container}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMin slice" viewBox="0 0 471 610">
        <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
          <path d="M227.745173,59.8673874 C227.745173,24.9630524 227.745173,38.488022 227.745173,100.442296 C227.745173,118.702088 227.745173,123.104678 227.745173,165.095628 C227.745173,207.086579 127,184.308214 127,230.873718 C127,280.843197 327,268.4034 327,334.933694 C327,388.790224 227.745173,366.626835 227.745173,408.76074 C227.745173,444.082917 227.745173,511.16267 227.745173,610" id="Line1" strokeOpacity="0.8" stroke="#FFFFFF"></path>
          <path d="M227.745173,78.8673874 C227.745173,43.9630524 227.745173,57.488022 227.745173,119.442296 C227.745173,137.702088 227.745173,142.104678 227.745173,184.095628 C227.745173,226.086579 127,203.308214 127,249.873718 C127,299.843197 327,287.4034 327,353.933694 C327,407.790224 227.745173,385.626835 227.745173,427.76074 C227.745173,463.082917 227.745173,530.16267 227.745173,629" id="Line2" stroke="#FFFFFF"></path>
          <path d="M227.745173,98.8673874 C227.745173,63.9630524 227.745173,77.488022 227.745173,139.442296 C227.745173,157.702088 227.745173,162.104678 227.745173,204.095628 C227.745173,246.086579 127,223.308214 127,269.873718 C127,319.843197 327,307.4034 327,373.933694 C327,427.790224 227.745173,405.626835 227.745173,447.76074 C227.745173,483.082917 227.745173,550.16267 227.745173,649" id="Line3" strokeOpacity="0.8" stroke="#FFFFFF"></path>
          <path d="M227.745173,117.867387 C227.745173,82.9630524 227.745173,96.488022 227.745173,158.442296 C227.745173,176.702088 227.745173,181.104678 227.745173,223.095628 C227.745173,265.086579 127,242.308214 127,288.873718 C127,338.843197 327,326.4034 327,392.933694 C327,446.790224 227.745173,424.626835 227.745173,466.76074 C227.745173,502.082917 227.745173,569.16267 227.745173,668" id="Line4" strokeOpacity="0.6" stroke="#FFFFFF"></path>
          <path d="M227.745173,137.867387 C227.745173,102.963052 227.745173,116.488022 227.745173,178.442296 C227.745173,196.702088 227.745173,201.104678 227.745173,243.095628 C227.745173,285.086579 127,262.308214 127,308.873718 C127,358.843197 327,346.4034 327,412.933694 C327,466.790224 227.745173,444.626835 227.745173,486.76074 C227.745173,522.082917 227.745173,589.16267 227.745173,688" id="Line5" strokeOpacity="0.4" stroke="#FFFFFF"></path>
          <path d="M227.745173,38.8673874 C227.745173,3.96305242 227.745173,17.488022 227.745173,79.442296 C227.745173,97.7020878 227.745173,102.104678 227.745173,144.095628 C227.745173,186.086579 127,163.308214 127,209.873718 C127,259.843197 327,247.4034 327,313.933694 C327,367.790224 227.745173,345.626835 227.745173,387.76074 C227.745173,423.082917 227.745173,490.16267 227.745173,589" id="Line6" strokeOpacity="0.6" stroke="#FFFFFF"></path>
          <path d="M227.745173,18.8673874 C227.745173,-16.0369476 227.745173,-2.51197804 227.745173,59.442296 C227.745173,77.7020878 227.745173,82.1046781 227.745173,124.095628 C227.745173,166.086579 127,143.308214 127,189.873718 C127,239.843197 327,227.4034 327,293.933694 C327,347.790224 227.745173,325.626835 227.745173,367.76074 C227.745173,403.082917 227.745173,470.16267 227.745173,569" id="Line7" strokeOpacity="0.4" stroke="#FFFFFF"></path>
        </g>

        <defs>
          <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="72.4736449%" id="radialGradient-1">
            <stop stopColor="#8A7FCD" offset="0%"></stop>
            <stop stopColor="#59338D" offset="100%"></stop>
          </radialGradient>
          <circle id="path-2" cx="121" cy="93" r="4"></circle>
          <filter x="-81.2%" y="-68.8%" width="262.5%" height="262.5%" filterUnits="objectBoundingBox" id="filter-3">
            <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
          </filter>
        </defs>
        
        {Array.from({ length: 7 }).map((_, i) => (
          <circle key={i} id="path-2" r={i % 2 === 0 ? 4 : 3} fill="url(#radialGradient-1)" fillOpacity="1" filter="url(#filter-3)" xlinkHref="#path-2">
            <animateMotion dur={`${8 - i * 0.5}s`} repeatCount="indefinite">
              <mpath xlinkHref={`#Line${7 - i}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default LoginAnimation;