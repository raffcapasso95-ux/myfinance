const { Section: PSection, DisplayLockup: PLockup, PricingCard, ComparisonTable, AlertBanner, Button: PButton } = window.DS;

const TIERS = [
  { name:'Free', description:'For personal projects and prototypes.', price:'$0', period:'forever', cta:'Start for free', features:['20 user seats','10,000 documents','2 datasets','Community support'] },
  { name:'Growth', description:'For teams shipping content every week.', price:'$15', period:'per seat / month', cta:'Start 30-day trial', featured:true, features:['Unlimited documents','Scheduled publishing','Comments & tasks','Email support'] },
  { name:'Enterprise', description:'For organizations with scale and compliance needs.', price:'Custom', cta:'Contact sales', features:['SSO & SAML','Dedicated infrastructure','99.9% uptime SLA','Named success manager'] },
  { name:'Custom', description:'Build a plan around your exact usage.', price:'Talk', period:'to us', cta:'Book a call', features:['Volume pricing','Custom contracts','Migration services'] },
];
const ROWS = [
  { group:'Content' },
  { label:'Documents', values:['10k','Unlimited','Unlimited','Unlimited'] },
  { label:'Datasets', values:['2','5','Unlimited','Unlimited'] },
  { label:'Scheduled publishing', values:[false,true,true,true] },
  { group:'Collaboration' },
  { label:'Real-time editing', values:[true,true,true,true] },
  { label:'Comments & tasks', values:[false,true,true,true] },
  { label:'Custom roles', values:[false,false,true,true] },
  { group:'Security' },
  { label:'SSO & SAML', values:[false,false,true,true] },
  { label:'Audit log', values:[false,'30 days','1 year','Custom'] },
];

window.PricingPage = function PricingPage() {
  const [annual, setAnnual] = React.useState(true);
  return <main>
    <PSection polarity="light">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'var(--space-xl)', flexWrap:'wrap', marginBottom:'var(--space-xxl)' }}>
        <PLockup tone="light" eyebrow="Pricing" size="xl" title="Start free. Scale when you're ready." />
        <div style={{ display:'flex', gap:4, padding:4, borderRadius:'var(--radius-full)', border:'1px solid var(--hairline)' }}>
          {['Monthly','Annual'].map(l => { const on = (l==='Annual')===annual; return <button key={l} onClick={() => setAnnual(l==='Annual')} className="sn-btn" style={{ height:36, padding:'0 var(--space-md)', borderRadius:'var(--radius-full)', font:'var(--t-button-sm)', background: on ? 'var(--ink)' : 'transparent', color: on ? 'var(--on-primary)' : 'var(--ink)' }}>{l}</button>; })}
        </div>
      </div>
      {annual && <AlertBanner style={{ marginBottom:'var(--space-lg)' }} action={<a className="sn-link" href="#">Compare plans</a>}>Annual billing includes two months free on Growth.</AlertBanner>}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'var(--space-lg)' }}>
        {TIERS.map(t => <PricingCard key={t.name} {...t} price={t.name==='Growth' && !annual ? '$18' : t.price}/>)}
      </div>
    </PSection>
    <PSection polarity="light" style={{ paddingTop:0 }}>
      <PLockup tone="light" eyebrow="Compare" size="sm" title="Every feature, side by side" style={{ marginBottom:'var(--space-xl)' }}/>
      <ComparisonTable tiers={TIERS.map(t => t.name)} featured="Growth" rows={ROWS}/>
    </PSection>
    <PSection polarity="dark">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'var(--space-xl)', flexWrap:'wrap' }}>
        <PLockup eyebrow="Enterprise" size="lg" title="Need something bigger?" lead="Talk to us about volume, compliance and dedicated support."/>
        <PButton variant="brand">Contact sales</PButton>
      </div>
    </PSection>
  </main>;
};
