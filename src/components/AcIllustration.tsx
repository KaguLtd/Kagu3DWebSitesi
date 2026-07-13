const FAN_BLADES = Array.from({ length: 34 });
const COIL_FINS = Array.from({ length: 48 });
const VENT_RIBS = Array.from({ length: 17 });

export function AcIllustration() {
  return (
    <svg
      className="ac-illustration"
      viewBox="0 0 1000 620"
      role="img"
      aria-labelledby="ac-svg-title ac-svg-description"
    >
      <title id="ac-svg-title">Kagu split klima teknik illüstrasyonu</title>
      <desc id="ac-svg-description">
        Kaydırma hareketiyle gövdesi, filtresi, serpantini, fanı ve kontrol
        parçaları üç boyutlu bir düzende ayrılan split klima.
      </desc>

      <defs>
        <linearGradient id="frontShell" x1="0.08" y1="0" x2="0.92" y2="1">
          <stop offset="0" stopColor="#fbfeff" />
          <stop offset="0.34" stopColor="#dcebf1" />
          <stop offset="0.7" stopColor="#9bb5c2" />
          <stop offset="1" stopColor="#567486" />
        </linearGradient>
        <linearGradient id="frontHighlight" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#ffffff" stopOpacity=".94" />
          <stop offset=".5" stopColor="#c8e1e9" stopOpacity=".2" />
          <stop offset="1" stopColor="#ffffff" stopOpacity=".72" />
        </linearGradient>
        <linearGradient id="innerShell" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#1b3849" />
          <stop offset=".46" stopColor="#0c2231" />
          <stop offset="1" stopColor="#06111b" />
        </linearGradient>
        <linearGradient id="edgeMetal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#8ff3ff" stopOpacity=".9" />
          <stop offset=".38" stopColor="#24546b" stopOpacity=".62" />
          <stop offset="1" stopColor="#72ddeb" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id="coilMetal" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#147b91" />
          <stop offset=".18" stopColor="#9af5ff" />
          <stop offset=".5" stopColor="#2cb9d1" />
          <stop offset=".82" stopColor="#9af5ff" />
          <stop offset="1" stopColor="#12677e" />
        </linearGradient>
        <linearGradient id="fanBody" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#4edced" />
          <stop offset=".38" stopColor="#173e50" />
          <stop offset="1" stopColor="#071722" />
        </linearGradient>
        <linearGradient id="copper" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#754222" />
          <stop offset=".35" stopColor="#f7b35d" />
          <stop offset=".66" stopColor="#c5682e" />
          <stop offset="1" stopColor="#6d341b" />
        </linearGradient>
        <radialGradient id="motorMetal" cx=".34" cy=".25" r=".8">
          <stop stopColor="#7be6f1" />
          <stop offset=".22" stopColor="#31596b" />
          <stop offset=".72" stopColor="#102536" />
          <stop offset="1" stopColor="#07131d" />
        </radialGradient>
        <pattern id="filterMesh" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 0H12V12H0Z" fill="none" stroke="#8ee9f3" strokeOpacity=".25" strokeWidth=".7" />
          <path d="m0 12 12-12" stroke="#d2fbff" strokeOpacity=".13" strokeWidth=".65" />
        </pattern>
        <filter id="partGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="shellShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="15" floodColor="#000711" floodOpacity=".62" />
        </filter>
        <clipPath id="coilClip">
          <path d="M220 214Q500 160 780 214L764 326Q500 283 236 326Z" />
        </clipPath>
      </defs>

      <ellipse className="ac-ground-glow" cx="505" cy="470" rx="352" ry="62" />

      <g data-depth="-6">
        <g id="ac-mounting-rail">
          <path d="M132 171V126Q132 108 151 108H849Q868 108 868 126V171M151 108v55h59v-34h580v34h59v-55" fill="none" stroke="#79ddea" strokeWidth="5" strokeLinejoin="round" />
          <path d="M155 119h50M795 119h50M226 119v35M774 119v35" stroke="#aaf2f8" strokeOpacity=".45" />
          <path d="M165 139h25M810 139h25" stroke="#61ddeb" strokeWidth="3" strokeLinecap="round" />
          <circle cx="156" cy="119" r="5" fill="none" stroke="#9bf1f8" />
          <circle cx="844" cy="119" r="5" fill="none" stroke="#9bf1f8" />
        </g>
      </g>

      <g data-depth="-5">
        <g id="ac-backplate">
          <path
            d="M126 190 134 152Q137 132 170 126H830Q863 132 866 152L874 190 862 380Q860 405 830 412H170Q140 405 138 380Z"
            fill="#061521"
            stroke="#62e4f2"
            strokeOpacity=".5"
            strokeWidth="2"
          />
          <path d="M190 181Q500 143 810 181M187 384Q500 423 813 384" fill="none" stroke="#6ee8f5" strokeOpacity=".2" strokeDasharray="7 9" />
          <path d="M201 200v171M799 200v171M266 177v220M734 177v220" stroke="#61d8e8" strokeOpacity=".13" />
          <path d="M170 268h31l17-20h564l17 20h31" fill="none" stroke="#5bddec" strokeOpacity=".28" />
          <g fill="none" stroke="#77ecf7" strokeOpacity=".62">
            <circle cx="205" cy="202" r="7" /><path d="m200 202 10 0m-5-5v10" />
            <circle cx="795" cy="202" r="7" /><path d="m790 202 10 0m-5-5v10" />
            <circle cx="205" cy="373" r="7" /><path d="m200 373 10 0m-5-5v10" />
            <circle cx="795" cy="373" r="7" /><path d="m790 373 10 0m-5-5v10" />
          </g>
        </g>
      </g>

      <g data-depth="-3">
        <g id="ac-body">
          <path
            d="M142 184 150 148Q153 126 185 120H815Q847 126 850 148L858 184 846 370Q844 394 814 402H186Q156 394 154 370Z"
            fill="url(#innerShell)"
            stroke="url(#edgeMetal)"
            strokeWidth="2.2"
          />
          <path d="M201 190Q500 153 799 190L788 350Q500 318 212 350Z" fill="#071a27" stroke="#3dbfd2" strokeOpacity=".35" />
          <path d="M214 359Q500 394 786 359L778 394Q500 424 222 394Z" fill="#030d15" stroke="#4ed8e8" strokeOpacity=".4" />
          <path d="M195 203q-10 94 1 174M805 203q10 94-1 174" fill="none" stroke="#d4fbff" strokeOpacity=".18" />
        </g>
      </g>

      <g data-depth="-1">
        <g id="ac-coil">
          <path
            d="M220 214Q500 160 780 214L764 326Q500 283 236 326Z"
            fill="#092836"
            stroke="#8df1fa"
            strokeWidth="2.4"
          />
          <g clipPath="url(#coilClip)">
            {COIL_FINS.map((_, index) => (
              <path
                key={index}
                d={`M${204 + index * 13} 158l18 190`}
                stroke="url(#coilMetal)"
                strokeWidth="4.6"
                opacity=".86"
              />
            ))}
            <path d="M218 224Q500 171 782 224M221 250Q500 199 779 250M225 276Q500 228 775 276M230 302Q500 258 770 302" fill="none" stroke="#b8f7fd" strokeOpacity=".55" strokeWidth="1.2" />
          </g>
          <path d="M782 221q42 10 7 35q-25 18 3 36q35 21-5 44" fill="none" stroke="url(#copper)" strokeWidth="7" strokeLinecap="round" />
          <path d="M776 227q27 8 6 23M779 300q27 10 3 27" fill="none" stroke="#ffd393" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>

      <g data-depth="2.5">
        <g id="ac-intake-frame">
          <path d="M198 166Q500 111 802 166L790 322Q500 282 210 322Z" fill="none" stroke="#8ceaf4" strokeWidth="3" />
          <path d="M500 124v176M214 198Q500 144 786 198" fill="none" stroke="#5ed7e6" strokeOpacity=".58" />
          <path d="M207 180h20M773 180h20M224 307h20M756 307h20" stroke="#d6fbff" strokeOpacity=".52" strokeWidth="3" strokeLinecap="round" />
          <circle cx="500" cy="140" r="4" fill="#69e5f2" />
        </g>
      </g>

      <g data-depth="3">
        <g id="ac-filter-left">
          <path d="M221 176Q336 153 486 147L482 278Q350 286 235 312Z" fill="rgba(37,109,126,.28)" stroke="#b1f6fc" strokeWidth="2.2" />
          <path d="M235 185Q347 165 472 160L469 264Q348 272 247 294Z" fill="url(#filterMesh)" />
          <path d="M254 184 249 291M300 174l-7 108M347 166l-5 109M394 160l-3 111M441 156l-1 112" stroke="#d6fbff" strokeOpacity=".22" />
          <path d="M230 198Q350 175 481 170" fill="none" stroke="#e5fdff" strokeOpacity=".38" />
        </g>
      </g>
      <g data-depth="2.5">
        <g id="ac-filter-right">
          <path d="M514 147Q664 153 779 176L765 312Q650 286 518 278Z" fill="rgba(37,109,126,.28)" stroke="#b1f6fc" strokeWidth="2.2" />
          <path d="M528 160Q653 165 765 185L753 294Q652 272 531 264Z" fill="url(#filterMesh)" />
          <path d="m746 184 5 107M700 174l7 108M653 166l5 109M606 160l3 111M559 156l1 112" stroke="#d6fbff" strokeOpacity=".22" />
          <path d="M519 170Q650 175 770 198" fill="none" stroke="#e5fdff" strokeOpacity=".38" />
        </g>
      </g>

      <g data-depth="1.5">
        <g id="ac-fan">
          <path d="M246 321Q500 299 729 322L727 376Q500 399 246 375Z" fill="url(#fanBody)" stroke="#75e9f5" strokeWidth="2.2" />
          <ellipse cx="250" cy="348" rx="22" ry="28" fill="#102d3d" stroke="#8aeff8" strokeWidth="2" />
          <ellipse cx="726" cy="349" rx="18" ry="26" fill="#0b2231" stroke="#5edcec" strokeWidth="2" />
          {FAN_BLADES.map((_, index) => {
            const x = 270 + index * 13.1;
            return <path key={index} d={`M${x} 316q-10 32 2 66`} fill="none" stroke="#9ef2fa" strokeOpacity=".58" strokeWidth="3.4" strokeLinecap="round" />;
          })}
          <path d="M271 329Q500 312 708 330M270 364Q500 382 708 364" fill="none" stroke="#d3fbff" strokeOpacity=".32" />
          <circle cx="250" cy="348" r="8" fill="#6ae5f3" opacity=".7" />
        </g>
      </g>

      <g data-depth="2.6">
        <g id="ac-bearing">
          <path d="M213 319h24l14 13v33l-14 14h-24l-16-15v-31Z" fill="#102a39" stroke="#7ce8f4" strokeWidth="2" />
          <circle cx="222" cy="349" r="20" fill="url(#motorMetal)" stroke="#a4f4fa" strokeWidth="2" />
          <circle cx="222" cy="349" r="9" fill="#06131d" stroke="#5fdde9" />
          <path d="M222 324v8M222 366v8M197 349h8M239 349h8" stroke="#b8f8fc" strokeOpacity=".62" />
        </g>
      </g>

      <g data-depth="2">
        <g id="ac-motor">
          <path d="M739 316h18v65h-18z" fill="#183a4a" stroke="#64ddea" />
          <ellipse cx="777" cy="348" rx="37" ry="43" fill="url(#motorMetal)" stroke="#83edf6" strokeWidth="2.2" />
          <ellipse cx="777" cy="348" rx="23" ry="27" fill="#071822" stroke="#59dbea" strokeDasharray="3 4" />
          <circle cx="777" cy="348" r="8" fill="#77e8f4" />
          <path d="M777 319v10M777 367v10M750 348h10M794 348h10" stroke="#c7f9fd" strokeOpacity=".5" strokeWidth="2" />
        </g>
      </g>

      <g data-depth="3">
        <g id="ac-swing-motor">
          <path d="M762 395h47l13 16-8 35h-54l-11-17Z" fill="#153342" stroke="#7ee8f3" strokeWidth="2" />
          <circle cx="782" cy="420" r="14" fill="url(#motorMetal)" stroke="#b0f4fa" />
          <circle cx="782" cy="420" r="5" fill="#69e3ef" />
          <path d="m798 409 15 5-5 20-14-4" fill="#06202c" stroke="#5edce9" />
          <path d="M765 446q-8 12 2 23" fill="none" stroke="#f2c25c" strokeWidth="2" />
          <path d="M773 446q-2 13 10 21" fill="none" stroke="#52dfef" strokeWidth="2" />
        </g>
      </g>

      <g data-depth="3">
        <g id="ac-board">
          <path d="M755 213 827 222l-7 94-74-11Z" fill="#052d31" stroke="#56f0d2" strokeWidth="2.2" />
          <path d="m765 231 19 3-2 17 25 4M761 270l15 2-3 24M786 265l23 4-2 30" fill="none" stroke="#5cf2d4" strokeOpacity=".78" strokeWidth="2" />
          <rect x="791" y="228" width="18" height="13" rx="2" transform="rotate(8 791 228)" fill="#113d43" stroke="#a2f9e7" />
          <circle cx="763" cy="222" r="4" fill="#ffb552" />
          <circle cx="816" cy="230" r="4" fill="#51f0cf" filter="url(#partGlow)" />
          <path d="M748 300q-30 10-35 34" fill="none" stroke="#f1c55c" strokeWidth="2" />
          <path d="M753 307q-20 18-18 37" fill="none" stroke="#54dff2" strokeWidth="2" />
        </g>
      </g>

      <g data-depth="4">
        <g id="ac-display">
          <path d="M650 333h86l8 22-14 18h-82l-11-18Z" fill="#08252f" stroke="#77e5f1" strokeWidth="2" />
          <rect x="665" y="343" width="48" height="18" rx="4" fill="#041218" stroke="#3fbccd" />
          <circle cx="675" cy="352" r="3" fill="#54e8f6" filter="url(#partGlow)" />
          <path d="M684 352h19" stroke="#67dce8" strokeWidth="2" strokeLinecap="round" />
          <path d="M646 365q-20 10-24 27" fill="none" stroke="#f0b851" strokeWidth="2" />
        </g>
      </g>

      <g data-depth="3.4">
        <g id="ac-sensor">
          <path d="M248 210q-23-22-45-4q-13 12-5 34" fill="none" stroke="#68dfea" strokeWidth="3" />
          <path d="M199 238q5 15 21 12" fill="none" stroke="#e2f8fa" strokeOpacity=".6" strokeWidth="2" />
          <rect x="239" y="201" width="25" height="15" rx="4" fill="#102f3e" stroke="#89eaf4" />
          <circle cx="252" cy="208.5" r="3" fill="#ffbd5d" />
        </g>
      </g>

      <g data-depth="1.8">
        <g id="ac-wire-harness" opacity=".36">
          <path d="M817 255c58-22 37 48 72 56q30 7 18 39" fill="none" stroke="#f2bd58" strokeWidth="3" strokeLinecap="round" />
          <path d="M815 265c47-9 29 43 65 54q21 7 14 35" fill="none" stroke="#5ce1ef" strokeWidth="3" strokeLinecap="round" />
          <path d="M814 275c38 4 20 42 53 53q19 7 15 30" fill="none" stroke="#e8f6f7" strokeOpacity=".72" strokeWidth="2" strokeLinecap="round" />
          <rect x="902" y="347" width="20" height="14" rx="3" fill="#172f3b" stroke="#83e7f1" />
        </g>
      </g>

      <g data-depth="2">
        <g id="ac-drain">
          <path d="M204 371Q500 409 796 371L777 421Q500 456 223 421Z" fill="url(#innerShell)" stroke="#83eaf4" strokeWidth="2.2" />
          <path d="M233 394Q500 426 767 394" fill="none" stroke="#9bf1f8" strokeOpacity=".48" />
          <path d="M260 414Q500 439 740 414" fill="none" stroke="#2ba8bc" strokeOpacity=".42" />
          <path d="M760 388q35 6 48 30" fill="none" stroke="#5bddea" strokeWidth="5" strokeLinecap="round" />
        </g>
      </g>

      <g data-depth="2.8">
        <g id="ac-air-guide">
          <path d="M238 392Q500 422 762 392L756 420Q500 450 244 420Z" fill="#0a1d29" stroke="#74e5f1" strokeWidth="2" />
          <path d="M266 405Q500 429 734 405" fill="none" stroke="#b5f5fa" strokeOpacity=".48" />
          {Array.from({ length: 14 }, (_, index) => {
            const x = 292 + index * 32;
            return <path key={index} d={`M${x} 406v20l7 7`} fill="none" stroke="#65dce9" strokeOpacity=".65" strokeWidth="2" />;
          })}
        </g>
      </g>

      <g data-depth="3.5">
        <g id="ac-louvers">
          <path d="M226 407Q500 441 774 407L765 449Q500 480 235 449Z" fill="#071720" stroke="#9bf2fa" strokeWidth="2.2" />
          <path d="M250 421Q500 448 750 421L746 436Q500 462 254 436Z" fill="#1c4657" stroke="#78e4ef" strokeOpacity=".75" />
          {VENT_RIBS.map((_, index) => {
            const x = 275 + index * 28;
            return <path key={index} d={`M${x} 428l-2 23`} stroke="#8eeaf4" strokeOpacity=".52" strokeWidth="2" />;
          })}
          <path d="M270 453Q500 478 730 453" fill="none" stroke="#5eddeb" strokeOpacity=".32" />
        </g>
      </g>

      <g data-depth=".5">
        <g id="ac-pipes" opacity=".26">
          <path d="M805 285c72 5 44 76 102 92" fill="none" stroke="#0b1720" strokeWidth="15" strokeLinecap="round" />
          <path d="M806 280c72 5 44 76 102 92" fill="none" stroke="url(#copper)" strokeWidth="8" strokeLinecap="round" />
          <path d="M807 302c56 12 35 68 92 86" fill="none" stroke="#74e3ef" strokeWidth="5" strokeLinecap="round" />
          <path d="M811 321c45 18 24 65 75 81" fill="none" stroke="#e6f6f7" strokeOpacity=".42" strokeWidth="4" strokeLinecap="round" />
        </g>
      </g>

      <g data-depth="5">
        <g id="ac-front-cover" filter="url(#shellShadow)">
          <path
            d="M108 176 116 136Q120 108 158 102H842Q880 108 884 136L892 176 880 344Q877 374 840 386 500 414 160 386 123 374 120 344Z"
            fill="url(#frontShell)"
            stroke="#eefcff"
            strokeWidth="2.5"
          />
          <path d="M145 143Q500 113 855 143" fill="none" stroke="url(#frontHighlight)" strokeWidth="2" strokeLinecap="round" />
          <path d="M126 305Q500 335 874 305" fill="none" stroke="#284b5d" strokeOpacity=".62" strokeWidth="2.1" />
          <path d="M142 334Q500 366 858 334L848 366Q500 397 152 366Z" fill="#224657" fillOpacity=".24" stroke="#6fcbd8" strokeOpacity=".43" />
          <path d="M170 354Q500 381 830 354" fill="none" stroke="#c7f8fc" strokeOpacity=".35" />
          <path d="M158 120H842" fill="none" stroke="#ffffff" strokeOpacity=".42" />
          <g transform="translate(690 231)">
            <text x="0" y="0" fill="#173747" fontSize="19" fontWeight="800" letterSpacing="6">KAGU</text>
            <path d="M1 13h64" stroke="#163746" strokeOpacity=".54" />
          </g>
          <g transform="translate(216 230)" fill="none" stroke="#264958" strokeWidth="1.5" opacity=".72">
            <path d="M0 0h42" /><path d="M6 7h29" />
          </g>
          <circle cx="779" cy="354" r="4" fill="#4ee7f7" filter="url(#partGlow)" />
          <path d="M779 354h24" stroke="#55dce9" strokeOpacity=".38" />
        </g>
      </g>

      <g className="blueprint-marks" aria-hidden="true">
        <path d="M115 112V80h32M885 112V80h-32M115 451v32h32M885 451v32h-32" fill="none" stroke="#63deeb" strokeOpacity=".58" />
        <path d="M145 500H855M145 489v22M855 489v22" stroke="#5bd7e6" strokeOpacity=".34" />
        <path d="M500 88V55M490 65h20" stroke="#5bd7e6" strokeOpacity=".24" />
      </g>

      <g className="assembly-indexes" aria-hidden="true" opacity="0">
        <g><circle cx="178" cy="151" r="13" /><text x="178" y="155">01</text><path d="M191 151h45" /></g>
        <g><circle cx="314" cy="111" r="13" /><text x="314" y="115">02</text><path d="M327 111h38" /></g>
        <g><circle cx="486" cy="83" r="13" /><text x="486" y="87">03</text><path d="M499 83h42" /></g>
        <g><circle cx="808" cy="154" r="13" /><text x="808" y="158">04</text><path d="M763 154h32" /></g>
        <g><circle cx="177" cy="378" r="13" /><text x="177" y="382">05</text><path d="M190 378h42" /></g>
        <g><circle cx="826" cy="405" r="13" /><text x="826" y="409">06</text><path d="M777 405h36" /></g>
        <g><circle cx="297" cy="493" r="13" /><text x="297" y="497">07</text><path d="M310 493h40" /></g>
        <g><circle cx="714" cy="495" r="13" /><text x="714" y="499">08</text><path d="M665 495h36" /></g>
      </g>
    </svg>
  );
}
