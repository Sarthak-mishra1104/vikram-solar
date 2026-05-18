export const SUBSIDY_TABLE = [
  {kw:1,subsidy:30000},{kw:2,subsidy:60000},{kw:3,subsidy:78000},
  {kw:4,subsidy:94500},{kw:5,subsidy:94500},{kw:10,subsidy:94500},
]

export const APPLIANCE_LOAD = {
  'AC (1.5 Ton)':1500, 'Geyser':2000, 'LED Lights':80, 'Computer / Laptop':300,
  'Refrigerator':200, 'Television':120, 'Washing Machine':700,
  'Water Pump':750, 'Microwave':900, 'Exhaust Fan':60,
}

export function getSubsidy(kw) {
  const clamped = Math.min(Math.max(kw,1),10)
  const entry = [...SUBSIDY_TABLE].reverse().find(s=>clamped>=s.kw)
  return entry?entry.subsidy:30000
}

export function calculateSolar({roofSize,monthlyBill,monthlyUnits,stateName}) {
  const maxCapacityByRoof = Math.floor(roofSize/65)
  const neededKw = Math.max(1,Math.ceil(monthlyUnits/120))
  const recommendedKw = Math.min(Math.max(maxCapacityByRoof,1),neededKw,10)
  const costPerKw = 65000
  const totalCost = recommendedKw*costPerKw
  const subsidy = getSubsidy(recommendedKw)
  const netCost = totalCost-subsidy
  const monthlySavings = Math.round(monthlyBill*0.82)
  const yearlySavings = monthlySavings*12
  const payback = (netCost/yearlySavings).toFixed(1)
  const roiPercent = Math.round((yearlySavings/netCost)*100)
  const billAfter = Math.round(monthlyBill*0.15)
  const co2Saved = Math.round(recommendedKw*1.4*12)
  const panelType = recommendedKw>=5?'Bifacial N-Type TOPCon':'Mono PERC'
  const inverterType = recommendedKw>=5?'Hybrid Grid-Tie Inverter':'On-Grid String Inverter'
  const numPanels = Math.ceil((recommendedKw*1000)/400)
  const roofAreaNeeded = numPanels*20
  return {recommendedKw,totalCost,subsidy,netCost,monthlySavings,yearlySavings,payback,roiPercent,billAfter,co2Saved,panelType,inverterType,numPanels,roofAreaNeeded}
}

export const PANEL_TYPES = [
  {id:'mono',name:'Monocrystalline PERC',badge:'Best Value',badgeType:'best',desc:'Highest efficiency for limited rooftop space. The premium choice for urban homes and apartments.',efficiency:'22–24%',efficiencyPct:92,lifespan:'25+ years',costPerW:'₹28–35',gradStart:'#CC0000',gradEnd:'#FF4444',effColor:'var(--red)'},
  {id:'poly',name:'Polycrystalline',badge:'Budget Pick',badgeType:'normal',desc:'Cost-effective with reliable performance. Best suited for larger rooftops where space is not a constraint.',efficiency:'15–18%',efficiencyPct:72,lifespan:'22–25 years',costPerW:'₹22–28',gradStart:'#555',gradEnd:'#888',effColor:'var(--muted)'},
  {id:'bifacial',name:'Bifacial N-Type TOPCon',badge:null,badgeType:null,desc:'Generates power from both front and rear sides. Premium technology for maximum energy output per panel.',efficiency:'24–27%',efficiencyPct:98,lifespan:'30+ years',costPerW:'₹38–48',gradStart:'#CC0000',gradEnd:'#660000',effColor:'var(--red)'},
  {id:'halfcut',name:'Half-Cut Cell',badge:null,badgeType:null,desc:'Reduced resistive losses and superior shading tolerance. Excellent for rooftops with partial shade.',efficiency:'20–22%',efficiencyPct:82,lifespan:'25 years',costPerW:'₹30–38',gradStart:'#888',gradEnd:'#CC0000',effColor:'var(--muted)'},
]

export const PACKAGES = [
  {title:'Starter — 1–2 kW',titleColor:'var(--text)',desc:'For small households. Covers lights, fans, TV and basic appliances. Ideal for 1BHK apartments.',grossCost:'₹65,000',netCost:'₹30,000',popular:false},
  {title:'Standard — 3–5 kW',titleColor:'var(--red)',desc:'For mid-size families. Runs AC, geyser, refrigerator and all appliances. Ideal for 2–3BHK homes.',grossCost:'₹1,80,000',netCost:'₹1,02,000',popular:true},
  {title:'Premium — 6–10 kW',titleColor:'var(--text)',desc:'For large homes and societies. Handles multiple ACs and heavy appliances. Full energy independence.',grossCost:'₹3,40,000',netCost:'₹2,62,000',popular:false},
]

export const SUBSIDY_ROWS = [
  {cap:'1 kW',gross:'₹65,000',sub:'₹30,000',net:'₹35,000',save:'~₹900/month',star:false},
  {cap:'2 kW',gross:'₹1,30,000',sub:'₹60,000',net:'₹70,000',save:'~₹1,800/month',star:false},
  {cap:'3 kW',gross:'₹1,95,000',sub:'₹78,000',net:'₹1,17,000',save:'~₹2,700/month',star:true},
  {cap:'5 kW',gross:'₹3,25,000',sub:'₹94,500',net:'₹2,30,500',save:'~₹4,500/month',star:false},
  {cap:'10 kW',gross:'₹6,50,000',sub:'₹94,500',net:'₹5,55,500',save:'~₹9,000/month',star:false},
]
