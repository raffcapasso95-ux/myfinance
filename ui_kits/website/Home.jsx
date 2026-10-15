const { Section, DisplayLockup, Button, FeatureCard, StudioWindow, Eyebrow, Badge, TextInput, Textarea } = window.DS;

function Hero({ onPricing }) {
  return <Section polarity="dark" style={{ paddingTop: 'var(--space-xxl)' }}>
    <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-lg)' }}>
      <div style={{ display:'flex', gap:12, alignItems:'center' }}><Badge>New</Badge><Eyebrow>Agent actions are now generally available</Eyebrow></div>
      <h1 className="t-display-mega" style={{ margin:0, color:'var(--on-primary)', maxWidth:1200, textWrap:'balance' }}>Content, structured for whatever comes next</h1>
      <p className="t-subtitle" style={{ margin:0, color:'var(--ash)', maxWidth:620 }}>Saniti is the content operating system for teams who ship. Model content as data, edit it together in real time, and deliver it to every channel.</p>
      <div style={{ display:'flex', gap:12 }}><Button variant="primary">Get started free</Button><Button variant="ghost-dark" onClick={onPricing} style={{ height:44 }}>See pricing →</Button></div>
    </div>
  </Section>;
}

function StudioShowcase() {
  const [tab, setTab] = React.useState('Structure');
  return <Section polarity="dark" style={{ paddingTop:0 }}>
    <StudioWindow title="studio.saniti.io / posts / spring-launch" bodyStyle={{ padding:0 }}>
      <div style={{ display:'flex', gap:6, padding:'var(--space-sm) var(--space-md)', borderBottom:'1px solid var(--hairline-soft)' }}>
        {['Structure','Vision','Presentation'].map(t => <Button key={t} variant="app-tab" active={tab===t} onClick={() => setTab(t)}>{t}</Button>)}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr 1fr', minHeight:320 }}>
        <div style={{ borderRight:'1px solid var(--hairline-soft)', padding:'var(--space-md)', display:'flex', flexDirection:'column', gap:10, font:'var(--t-caption)', color:'var(--ash)' }}>
          <span className="t-mono-caps" style={{ color:'var(--mute)' }}>Content</span>
          {['Posts','Authors','Categories','Products','Settings'].map((x,i) => <span key={x} style={{ color: i===0 ? 'var(--on-primary)' : undefined }}>{x}</span>)}
        </div>
        <div style={{ borderRight:'1px solid var(--hairline-soft)', padding:'var(--space-md)', display:'flex', flexDirection:'column', gap:12 }}>
          <span className="t-caption-tight" style={{ color:'var(--on-primary)' }}>Title</span>
          <TextInput tone="dark" defaultValue="Spring launch: what's new"/>
          <span className="t-caption-tight" style={{ color:'var(--on-primary)' }}>Body</span>
          <Textarea rows={5} defaultValue="This season we're shipping three things our customers asked for most…"/>
        </div>
        <div style={{ padding:'var(--space-md)', display:'flex', flexDirection:'column', gap:8 }}>
          <span className="t-mono-micro" style={{ color:'var(--mute)' }}>{tab.toUpperCase()} · PREVIEW</span>
          <div style={{ flex:1, borderRadius:'var(--radius-app-sm)', background:'repeating-linear-gradient(135deg,#212121 0 8px,#262626 8px 16px)', display:'flex', alignItems:'center', justifyContent:'center' }}><span className="t-mono-micro" style={{ color:'var(--mute)' }}>product screenshot</span></div>
        </div>
      </div>
    </StudioWindow>
  </Section>;
}

function Features() {
  return <Section polarity="dark">
    <DisplayLockup eyebrow="Why teams switch" size="xl" title="One content lake. Every surface." style={{ marginBottom:'var(--space-xxl)' }}/>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'var(--space-lg)' }}>
      <FeatureCard eyebrow="Studio" title="An editor shaped to your team" action={<Button variant="ghost-dark" style={{ padding:0 }}>Explore Studio →</Button>}>Define schemas in code and get a fully customizable editing environment.</FeatureCard>
      <FeatureCard eyebrow="Content Lake" title="Query anything, instantly">Store content as structured data and fetch exactly what each channel needs.</FeatureCard>
      <FeatureCard tone="brand" eyebrow="Agent" title="Content that works while you sleep">Automate translations, audits and enrichment across thousands of documents.</FeatureCard>
    </div>
  </Section>;
}

function Proof() {
  return <Section polarity="light">
    <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)', gap:'var(--space-xxl)', alignItems:'end' }}>
      <DisplayLockup tone="light" eyebrow="Customers" size="md" title="Trusted by teams who publish every day" />
      <p className="t-subtitle" style={{ margin:0, color:'var(--ink-soft)' }}>From newsrooms to global retailers, editors and developers work in the same system — without stepping on each other.</p>
    </div>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'var(--space-lg)', marginTop:'var(--space-xxl)' }}>
      {Array.from({ length:6 }).map((_,i) => <div key={i} style={{ height:56, border:'1px dashed var(--ash)', display:'flex', alignItems:'center', justifyContent:'center' }}><span className="t-mono-micro" style={{ color:'var(--mute)' }}>customer logo</span></div>)}
    </div>
  </Section>;
}

function ClosingCTA({ onPricing }) {
  return <Section polarity="dark">
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'var(--space-xxl)', flexWrap:'wrap' }}>
      <DisplayLockup eyebrow="Start today" size="xl" title="Build the content layer once." />
      <div style={{ display:'flex', gap:12 }}><Button variant="primary">Get started free</Button><Button variant="secondary-dark" style={{ height:44 }} onClick={onPricing}>View pricing</Button></div>
    </div>
  </Section>;
}

window.HomePage = function HomePage({ onPricing }) {
  return <main><Hero onPricing={onPricing}/><StudioShowcase/><Features/><Proof/><ClosingCTA onPricing={onPricing}/></main>;
};
