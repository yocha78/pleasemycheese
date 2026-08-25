/* ==================================================================
   FALLBACK — when the cheese isn't in the book
   ------------------------------------------------------------------
   Every cheese belongs to a family, and families pair predictably.
   `keywords` are matched against whatever the person typed, so a
   search for "creamy blue thing" still lands on the blue rules.
   ================================================================== */

export const FAMILIES = [
  {
    id: "blue",
    label: "Blue",
    hint: "Veined, salty, sharp — Roquefort, Stilton, Gorgonzola",
    keywords: ["blue", "bleu", "blu", "veined", "gorgonzola", "stilton", "roquefort", "danablu"],
    wine: "Sauternes", style: "Bordeaux · sweet white", color: "#D9A11B", rule: "Sweet against salt",
    why: "Blues are salty, sharp and high in fat, and sugar is what balances that — not tannin. A botrytised sweet white has the honeyed weight to meet the cheese and the acidity to stop the pairing turning sickly.",
    also: [["Vintage or Tawny Port", "The other half of the classic duo"], ["Late-harvest Riesling", "Lighter, more acidic, cheaper"]],
    avoid: ["Dry tannic red", "The single most common mistake — salt and tannin turn bitter and metallic"],
  },
  {
    id: "bloomy",
    label: "Soft with a white rind",
    hint: "Brie, Camembert, triple crème",
    keywords: ["brie", "camembert", "bloomy", "white rind", "soft", "creamy", "triple creme", "triple cream"],
    wine: "Champagne", style: "Champagne · dry sparkling", color: "#EBD98A", rule: "Acid cuts fat",
    why: "These cheeses coat the mouth with fat, and bubbles plus high acidity scrub the palate clean between bites. It's the reason sparkling wine is the safest single bottle for any cheeseboard.",
    also: [["Chardonnay", "Unoaked, from Burgundy or Chablis"], ["Light Pinot Noir", "The one red that doesn't fight a bloomy rind"]],
    avoid: ["Tannic Bordeaux", "Goes metallic against the creamy paste"],
  },
  {
    id: "washed",
    label: "Washed rind",
    hint: "Orange, sticky, pungent — Époisses, Munster, Taleggio",
    keywords: ["washed", "stinky", "smelly", "pungent", "epoisses", "munster", "taleggio", "orange rind", "sticky"],
    wine: "Alsace Gewurztraminer", style: "Alsace · aromatic off-dry white", color: "#E9C15C", rule: "Match the intensity",
    why: "Washed rinds smell of bacon and barnyard, and a quiet wine simply disappears next to them. Gewurztraminer's lychee and rose have the aromatic force to hold their ground, and a touch of residual sugar catches the salty rind.",
    also: [["Off-dry Riesling", "Same logic, sharper and lighter"], ["Beaujolais", "If a red is wanted — fruit and acid, no heavy tannin"]],
    avoid: ["Cabernet, Barolo, Shiraz", "High tannin against a washed rind is harsh and metallic"],
  },
  {
    id: "goat",
    label: "Goat",
    hint: "Chalky, lemony, tangy — chèvre, Crottin, Sainte-Maure",
    keywords: ["goat", "goats", "chevre", "crottin", "capra", "cabra", "ziegen"],
    wine: "Sancerre", style: "Loire · dry Sauvignon Blanc", color: "#E8E39A", rule: "Grows together, goes together",
    why: "Goat's cheese and Sauvignon Blanc both come from the Loire and both taste of lemon and cut grass. Matched acidity, matched weight — it's the most reliable pairing on the whole board.",
    also: [["Muscadet", "Leaner and saltier"], ["Dry rosé", "Especially with a fresh, young chèvre"]],
    avoid: ["Oaked Chardonnay", "Vanilla against goat's lactic tang is jarring"],
  },
  {
    id: "alpine",
    label: "Alpine",
    hint: "Nutty mountain wheels — Comté, Gruyère, Beaufort",
    keywords: ["alpine", "mountain", "comte", "gruyere", "beaufort", "emmental", "raclette", "fondue", "abondance", "swiss"],
    wine: "Jura Chardonnay", style: "Jura · nutty dry white", color: "#E5CE72", rule: "Grows together, goes together",
    why: "Alpine cheeses taste of brown butter and hazelnut, and the whites made in the same mountains taste of the same nut. Enough body to match the density, enough acidity to keep the palate clean.",
    also: [["Vin Jaune or Savagnin", "For long-aged wheels — the great Comté pairing"], ["Savoie white", "Jacquère or Roussette, lighter and local"]],
    avoid: ["Oaked Cabernet", "Oak and tannin bury the nuttiness"],
  },
  {
    id: "hard",
    label: "Hard and aged",
    hint: "Cheddar, Manchego, Parmigiano, old Gouda",
    keywords: ["hard", "aged", "mature", "cheddar", "manchego", "parmesan", "parmigiano", "gouda", "pecorino", "grana", "extra mature"],
    wine: "Rioja Reserva", style: "Rioja · medium-bodied red", color: "#7E2230", rule: "Match the intensity",
    why: "These are the cheeses that genuinely take red wine — enough salt, umami and concentration to stand up to tannin. Savoury, lightly oaked reds meet them without either side being flattened.",
    also: [["Tawny Port or Oloroso", "For very old, caramelised wheels"], ["Oaked Chardonnay", "The underrated white answer, richness for richness"]],
    avoid: ["Delicate light white", "It will taste of nothing next to the cheese"],
  },
  {
    id: "fresh",
    label: "Fresh",
    hint: "Young and milky — mozzarella, ricotta, burrata",
    keywords: ["fresh", "young", "mozzarella", "ricotta", "burrata", "cream cheese", "cottage", "mascarpone", "curd", "paneer", "queso fresco"],
    wine: "Vermentino", style: "Italy · crisp dry white", color: "#E9E8AC", rule: "Acid cuts fat",
    why: "Fresh cheeses have almost no flavour to fight with — the wine's job is mostly texture. Something light, citric and unoaked lifts the milk without burying it.",
    also: [["Prosecco", "Bubbles for anything creamy"], ["Dry rosé", "Especially with tomato or olive oil alongside"]],
    avoid: ["Any big red", "The cheese disappears completely"],
  },
  {
    id: "brined",
    label: "Brined and salty",
    hint: "Feta, halloumi, salty white cheeses",
    keywords: ["brined", "salty", "feta", "halloumi", "brine", "pickled", "telemea", "sirene"],
    wine: "Assyrtiko", style: "Greece · dry mineral white", color: "#EAE7A8", rule: "Acid cuts salt",
    why: "Very salty cheeses need acidity and mineral grip, not sweetness or structure. Aegean whites grown in salt wind on volcanic soil are built for exactly this.",
    also: [["Dry rosé", "With olive oil, oregano and tomato"], ["Sauvignon Blanc", "Herbal and sharp, works fine"]],
    avoid: ["Red wine", "Salt plus tannin equals bitter"],
  },
  {
    id: "semisoft",
    label: "Semi-soft",
    hint: "Supple and mellow — Tomme, Havarti, Saint-Nectaire",
    keywords: ["semi soft", "semisoft", "supple", "tomme", "havarti", "saint nectaire", "morbier", "edam", "port salut", "monterey"],
    wine: "Beaujolais", style: "Beaujolais · light Gamay red", color: "#A32B3C", rule: "Match the intensity",
    why: "Mild, earthy and low in salt. Gamay has bright fruit and barely any tannin, so it sits alongside without dominating — and served cool it works better still.",
    also: [["Pinot Noir", "Earthier, for mushroomy rinds"], ["Chenin Blanc", "The white route, with more acidity"]],
    avoid: ["Cabernet Sauvignon", "Far too structured for a gentle cheese"],
  },
];

/* The safety net when nothing at all matches. */
export const UNIVERSAL = {
  name: "Any cheese at all",
  family: "Mixed board",
  origin: "—",
  milk: "—",
  wine: "Brut Champagne", style: "Champagne · dry sparkling", color: "#EBD98A", rule: "When in doubt, bubbles",
  why: "Dry sparkling wine is the closest thing to a universal partner. The bubbles and acidity cut fat, the lack of tannin means nothing turns metallic, and it has enough character not to vanish next to a strong cheese.",
  also: [["Dry Loire Sauvignon Blanc", "The most versatile still white for a mixed board"], ["Beaujolais", "If the table wants red — light, fruity, low tannin"]],
  avoid: ["Big oaked Cabernet", "The usual instinct, and wrong for most of the board"],
  aka: [],
};
