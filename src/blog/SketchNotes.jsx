import React, { useEffect, useRef, useState } from 'react';
import './SketchNotes.css';

// Original, hand-sketched editorial diagrams. Every SVG stroke is progressively
// revealed when its illustration enters the viewport, with reduced-motion support.
const DIAGRAMS = {
  modalities: { eyebrow: '01 / THE IDEA', caption: 'different formats. one shared meaning.', alt: 'Text, pictures, sound, and video can all represent the same idea in a common embedding space.' },
  pipeline: { eyebrow: '02 / THE PIPELINE', caption: 'encode → compare → retrieve', alt: 'A text query and image, audio, video, or code records are encoded into comparable vectors for similarity search.' },
  dimensions: { eyebrow: '03 / THE TRADE-OFF', caption: 'a smaller vector is lighter — not magically better.', alt: 'Matryoshka embeddings may be shortened from 768 to 512, 256, or 128 dimensions, balancing quality and storage.' },
};

function Scribbles({ kind }) {
  if (kind === 'modalities') return (
    <svg className="sketch-svg" viewBox="0 0 740 355" role="img" aria-label={DIAGRAMS[kind].alt}>
      <g className="sketch-ink" strokeWidth="2.5">
        {/* handwritten cards: text, image, audio and video */}
        <path d="M36 89 Q48 77 61 80 L186 77 Q195 80 197 91 L196 201 Q193 211 181 212 L51 214 Q35 210 35 196 Z"/>
        <path d="M213 89 Q223 77 238 79 L355 78 Q366 81 366 94 L366 200 Q363 213 351 214 L225 213 Q211 207 213 193 Z"/>
        <path d="M385 91 Q391 78 404 81 L526 78 Q537 78 539 92 L537 200 Q535 211 524 212 L400 215 Q387 212 385 201 Z"/>
        <path d="M553 90 Q565 77 577 80 L699 79 Q711 82 708 94 L708 197 Q709 213 692 214 L566 213 Q553 208 554 198 Z"/>
        {/* a line of text */}
        <path d="M66 121 Q111 117 165 122 M67 136 Q123 132 164 137 M66 151 Q114 148 141 153"/>
        {/* mountain/photo */}
        <path d="M239 174 L269 140 L289 157 L312 126 L341 174 Z"/>
        <circle cx="251" cy="121" r="10"/>
        {/* audio waveform */}
        <path d="M413 160 V143 M425 169 V128 M437 178 V117 M449 164 V139 M461 185 V111 M473 164 V138 M485 178 V122 M497 166 V139 M510 156 V144"/>
        {/* film/video */}
        <path d="M581 118 L671 118 L673 179 L581 181 Z M591 114 V184 M663 114 V184 M608 143 L608 162 L628 153 Z"/>
        {/* lines flowing into one semantic cloud */}
        <path d="M119 217 Q117 250 262 271 M289 216 Q296 241 334 264 M461 218 Q451 244 416 266 M628 217 Q612 246 477 271"/>
        <path d="M321 263 Q331 242 365 247 Q393 233 416 251 Q448 248 465 276 Q470 294 448 308 L298 307 Q279 286 303 267 Z"/>
        <path d="M359 276 Q378 265 402 276 M350 290 Q379 299 411 288"/>
        {/* arrows */}
        <path d="M254 261 L266 271 L254 280 M326 250 L337 266 L320 268 M423 255 L415 270 L432 270 M481 259 L472 271 L485 281"/>
      </g>
      <g className="sketch-lettering">
        <text x="116" y="234" textAnchor="middle">text / code</text>
        <text x="289" y="234" textAnchor="middle">images</text>
        <text x="462" y="234" textAnchor="middle">audio</text>
        <text x="631" y="234" textAnchor="middle">video</text>
        <text x="379" y="340" textAnchor="middle" className="sketch-bold">shared meaning!</text>
      </g>
    </svg>
  );
  if (kind === 'pipeline') return (
    <svg className="sketch-svg" viewBox="0 0 740 348" role="img" aria-label={DIAGRAMS[kind].alt}>
      <g className="sketch-ink" strokeWidth="2.5">
        {/* query */}
        <path d="M20 96 Q29 85 47 86 L205 84 Q216 86 219 98 L219 154 Q214 169 199 167 L39 166 Q22 164 21 154 Z"/>
        <path d="M36 113 Q112 103 190 112 M36 126 Q108 118 166 126"/>
        {/* query to encoder */}
        <path d="M220 126 Q260 127 283 127 M273 119 L284 128 L274 137"/>
        {/* encoder unit */}
        <path d="M285 84 Q300 73 318 79 L443 78 Q462 82 459 98 L456 180 Q451 196 433 197 L312 198 Q291 193 287 177 Z"/>
        <circle cx="372" cy="121" r="18"/>
        <path d="M340 163 Q371 149 407 162 M339 170 Q372 178 412 170"/>
        {/* vector to search */}
        <path d="M462 130 Q495 126 519 127 M511 120 L520 128 L512 138"/>
        <path d="M520 79 Q535 72 549 77 L700 80 Q715 81 719 94 L718 186 Q713 201 695 199 L535 199 Q519 193 519 180 Z"/>
        {/* point map */}
        <circle cx="558" cy="106" r="5"/><circle cx="585" cy="124" r="5"/><circle cx="613" cy="104" r="5"/><circle cx="656" cy="118" r="5"/><circle cx="679" cy="160" r="5"/><circle cx="632" cy="157" r="5"/><circle cx="568" cy="164" r="5"/>
        <path d="M558 106 Q575 105 585 124 L613 104 L656 118 L679 160 L632 157 L568 164 L585 124"/>
        <circle cx="613" cy="104" r="18" strokeDasharray="3 5"/>
        {/* documents from below flow to encoder */}
        <path d="M284 263 Q317 245 351 261 L400 260 Q416 264 433 256"/>
        <path d="M304 262 L304 293 L425 291 L425 262"/>
        <path d="M327 287 L327 309 L440 309 L440 287"/>
        <path d="M373 259 L373 199 M363 209 L373 198 L384 209"/>
        <path d="M119 165 Q130 203 191 217 Q254 233 293 244"/>
        <path d="M280 234 L294 244 L276 248"/>
      </g>
      <g className="sketch-lettering">
        <text x="120" y="75" textAnchor="middle" className="sketch-bold">ask a question</text>
        <text x="372" y="59" textAnchor="middle" className="sketch-bold">embedding model</text>
        <text x="620" y="59" textAnchor="middle" className="sketch-bold">vector search</text>
        <text x="376" y="337" textAnchor="middle">your documents, photos & sounds</text>
        <text x="616" y="228" textAnchor="middle">closest meaning wins →</text>
      </g>
    </svg>
  );
  return (
    <svg className="sketch-svg" viewBox="0 0 740 348" role="img" aria-label={DIAGRAMS.dimensions.alt}>
      <g className="sketch-ink" strokeWidth="2.3">
        <path d="M80 257 L80 67 Q81 57 91 56 L191 56 L191 257 Z"/>
        <path d="M246 258 L246 101 Q246 89 259 88 L356 88 L356 258 Z"/>
        <path d="M410 259 L410 139 Q413 128 425 127 L525 127 L525 259 Z"/>
        <path d="M573 258 L573 188 Q573 177 586 174 L688 175 L688 259 Z"/>
        {/* softly organic strokes inside each nested tower */}
        <path d="M96 83 Q132 80 174 88 M98 112 Q136 107 175 113 M98 144 Q137 139 175 147 M98 173 Q131 171 176 178 M98 205 Q136 200 175 209 M98 234 Q132 228 177 235"/>
        <path d="M263 117 Q296 114 340 123 M264 147 Q304 144 340 151 M264 180 Q306 177 339 183 M264 218 Q302 213 341 222"/>
        <path d="M428 157 Q470 153 509 163 M428 185 Q469 180 509 189 M428 217 Q466 215 508 225"/>
        <path d="M592 202 Q634 198 672 206 M591 233 Q634 229 672 237"/>
        {/* shrinking arrows */}
        <path d="M198 160 Q221 143 237 145 M230 136 L237 145 L227 152"/>
        <path d="M360 190 Q387 174 401 178 M392 171 L402 178 L392 186"/>
        <path d="M527 216 Q547 198 563 198 M553 189 L564 198 L552 205"/>
        <path d="M68 262 Q387 273 700 263"/>
      </g>
      <g className="sketch-lettering">
        <text x="136" y="46" textAnchor="middle" className="sketch-bold">768d</text>
        <text x="301" y="78" textAnchor="middle" className="sketch-bold">512d</text>
        <text x="466" y="117" textAnchor="middle" className="sketch-bold">256d</text>
        <text x="629" y="165" textAnchor="middle" className="sketch-bold">128d</text>
        <text x="136" y="292" textAnchor="middle">full vector</text>
        <text x="628" y="292" textAnchor="middle">smallest</text>
        <text x="380" y="335" textAnchor="middle" className="sketch-bold">less storage ↔ quality trade-off</text>
      </g>
    </svg>
  );
}

export default function SketchNote({ kind }) {
  const note = DIAGRAMS[kind];
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) { setVisible(true); return undefined; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.18, rootMargin: '0px 0px -25px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  if (!note) return null;
  return (
    <figure ref={ref} className={'sketch-note' + (visible ? ' is-visible' : '')}>
      <div className="sketch-paper">
        <div className="sketch-paper-top"><span>{note.eyebrow}</span><span>SHRIYANS' FIELD NOTES</span></div>
        <Scribbles kind={kind}/>
        <p className="sketch-hand-caption">{note.caption}</p>
      </div>
      <figcaption>Scroll-revealed illustration · Conceptual diagram, not a measured benchmark</figcaption>
    </figure>
  );
}
