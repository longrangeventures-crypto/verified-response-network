import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldCheck, MapPin, FileText, UserPlus, ArrowRight } from "lucide-react";

/**
 * Verified Response Network (VRN) — Vercel-ready Vite+React site
 * - Welcome page with search (disaster + location)
 * - Sign up + Registry onboarding application
 * - About page with liability language + verification process
 *
 * Notes:
 * - This is a front-end MVP. Hook the submit handlers to your backend/email/CRM later.
 */

const DISASTER_TYPES = [
  "Flood / Storm Surge",
  "Hurricane / Tropical Storm",
  "Severe Storm / Tornado",
  "Wildfire",
  "Winter Storm / Ice",
  "Earthquake",
  "Landslide / Mudslide",
  "Other",
];

const MOCK_RESULTS = [
  {
    name: "Rapid Dry & Restore",
    category: "Water Extraction & Structural Drying",
    regions: "Southeast (VA/NC/SC)",
    mobilization: "<24 hours",
    badges: ["Compliance Verified", "Equipment Ready"],
    phone: "(555) 014-2031",
    email: "dispatch@rapiddry.example",
  },
  {
    name: "BlueLine Debris & Haul",
    category: "Debris Removal & Hauling",
    regions: "Mid-Atlantic (VA/MD/DC)",
    mobilization: "24–48 hours",
    badges: ["Disaster Response Experience", "Regional Response"],
    phone: "(555) 016-7722",
    email: "ops@bluelinehaul.example",
  },
  {
    name: "Evergreen Mitigation Services",
    category: "Wildfire Mitigation & Aftermath",
    regions: "National (Seasonal)",
    mobilization: "48+ hours",
    badges: ["Compliance Verified", "Field-Validated"],
    phone: "(555) 010-8899",
    email: "intake@evergreenms.example",
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-sm">
      {children}
    </span>
  );
}

function Pill({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900/5 px-3 py-1.5 text-sm text-zinc-800">
      <Icon className="h-4 w-4" />
      {label}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
          {eyebrow}
        </div>
      ) : null}
      <div className="text-2xl md:text-3xl font-semibold text-zinc-900">
        {title}
      </div>
      {subtitle ? <div className="text-zinc-600 max-w-2xl">{subtitle}</div> : null}
    </div>
  );
}

function Card({ children, className }) {
  return (
    <div className={cx("rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200", className)}>
      {children}
    </div>
  );
}

function Nav({ route, setRoute }) {
  const items = [
    { key: "home", label: "Home" },
    { key: "signup", label: "Sign Up" },
    { key: "about", label: "About" },
  ];

  return (
    <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setRoute("home")}
          className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-zinc-100"
          aria-label="Go to home"
        >
          <div className="h-9 w-9 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="leading-tight text-left">
            <div className="text-sm font-semibold text-zinc-900">
              Verified Response Network
            </div>
            <div className="text-xs text-zinc-500">Crisis-ready provider registry</div>
          </div>
        </button>

        <div className="flex items-center gap-1">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => setRoute(it.key)}
              className={cx(
                "rounded-xl px-3 py-2 text-sm font-medium transition",
                route === it.key
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-100"
              )}
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer({ setRoute }) {
  return (
    <div className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <div className="text-sm font-semibold text-zinc-900">
            Verified Response Network
          </div>
          <div className="text-sm text-zinc-600">
            A verified registry of crisis-ready service providers.
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Families-first</Badge>
            <Badge>Verification-focused</Badge>
            <Badge>Independent providers</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-zinc-900">Quick Links</div>
          <div className="grid gap-2 text-sm">
            <button
              className="text-left text-zinc-700 hover:underline"
              onClick={() => setRoute("home")}
            >
              Search providers
            </button>
            <button
              className="text-left text-zinc-700 hover:underline"
              onClick={() => setRoute("signup")}
            >
              Provider sign up
            </button>
            <button
              className="text-left text-zinc-700 hover:underline"
              onClick={() => setRoute("about")}
            >
              About + verification
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-zinc-900">Important</div>
          <div className="text-xs text-zinc-600 leading-relaxed">
            VRN does not dispatch emergency services and does not guarantee provider performance.
            If you are in immediate danger, call 911 or your local emergency number.
          </div>
        </div>
      </div>
      <div className="px-4 pb-8 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Verified Response Network, LLC. All rights reserved.
      </div>
    </div>
  );
}

function Home() {
  const [disaster, setDisaster] = useState("Flood / Storm Surge");
  const [location, setLocation] = useState("");
  const [queryRan, setQueryRan] = useState(false);

  const results = useMemo(() => {
    // MVP: simple mock filter. Replace with API call.
    if (!queryRan) return [];
    const loc = location.trim().toLowerCase();
    return MOCK_RESULTS.filter((r) => {
      const matchDisaster = disaster === "Other" ? true : true; // mock
      const matchLoc = loc ? r.regions.toLowerCase().includes(loc) : true;
      return matchDisaster && matchLoc;
    });
  }, [disaster, location, queryRan]);

  function onSearch(e) {
    e.preventDefault();
    setQueryRan(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <SectionTitle
              eyebrow="Families-first • Natural disasters"
              title="Find verified help fast — when it matters most"
              subtitle={
                "Search by disaster type and location to find providers who have documented readiness indicators. " +
                "In a crisis, clarity matters. We keep it simple: capability, region, and how quickly they can mobilize."
              }
            />

            <div className="flex flex-wrap gap-2">
              <Pill icon={ShieldCheck} label="Verification badges" />
              <Pill icon={MapPin} label="Region + mobilization" />
              <Pill icon={FileText} label="Transparent standards" />
            </div>
          </motion.div>

          <Card className="p-5 md:p-6">
            <form onSubmit={onSearch} className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-zinc-800">Disaster type</span>
                  <select
                    value={disaster}
                    onChange={(e) => setDisaster(e.target.value)}
                    className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                  >
                    {DISASTER_TYPES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-zinc-800">Location</span>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, State or Region (e.g., VA/NC/SC)"
                      className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                    />
                  </div>
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
              >
                <Search className="h-4 w-4" />
                Search
              </button>

              <div className="text-xs text-zinc-500 leading-relaxed">
                <span className="font-medium">Immediate emergency?</span> Call 911. VRN is a registry of independent providers and does not dispatch emergency services.
              </div>
            </form>
          </Card>

          <AnimatePresence>
            {queryRan ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-zinc-900">
                    Results {results.length ? `(${results.length})` : ""}
                  </div>
                  <div className="text-xs text-zinc-500">
                    Demo results (wire up to a database when ready)
                  </div>
                </div>

                {results.length === 0 ? (
                  <Card className="p-6">
                    <div className="text-sm font-semibold text-zinc-900">No matches yet</div>
                    <div className="mt-1 text-sm text-zinc-600">
                      Try a broader region (e.g., “Mid-Atlantic”) or leave location blank to see sample providers.
                    </div>
                  </Card>
                ) : (
                  <div className="grid gap-3">
                    {results.map((r) => (
                      <Card key={r.name} className="p-5">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="space-y-2">
                            <div className="text-lg font-semibold text-zinc-900">{r.name}</div>
                            <div className="text-sm text-zinc-600">{r.category}</div>
                            <div className="flex flex-wrap gap-2">
                              <Badge>{r.regions}</Badge>
                              <Badge>Mobilization: {r.mobilization}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {r.badges.map((b) => (
                                <Badge key={b}>{b}</Badge>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 p-4 min-w-[250px]">
                            <div className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                              Contact
                            </div>
                            <div className="mt-2 text-sm text-zinc-800">{r.phone}</div>
                            <div className="text-sm text-zinc-800">{r.email}</div>
                            <div className="mt-3 text-xs text-zinc-500">
                              Tip: Ask for current availability, insurance COI, and a written scope before authorizing work.
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6">
            <div className="text-sm font-semibold text-zinc-900">A calm checklist for families</div>
            <div className="mt-2 text-sm text-zinc-600 leading-relaxed">
              When everything feels urgent, your next step should still be safe. Here’s a simple sequence you can follow.
            </div>
            <ol className="mt-4 space-y-3 text-sm text-zinc-700">
              <li className="flex gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs">
                  1
                </span>
                Ensure everyone is safe. If needed, call 911.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs">
                  2
                </span>
                Document damage with photos/video and note dates/times.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs">
                  3
                </span>
                Contact your insurer (if applicable) and ask about next steps.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs">
                  4
                </span>
                Use VRN to find providers by region and mobilization window.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs">
                  5
                </span>
                Get a written scope and confirm insurance before work begins.
              </li>
            </ol>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900">Are you a provider?</div>
                <div className="mt-1 text-sm text-zinc-600">
                  Apply to be listed and earn verification badges.
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-zinc-500">
              Providers remain independent. VRN verifies documented readiness indicators and publishes transparent standards.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Signup({ setRoute }) {
  const [role, setRole] = useState("provider");
  const [submitted, setSubmitted] = useState(false);

  // Provider onboarding fields
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hq, setHq] = useState("");
  const [disasters, setDisasters] = useState(["Flood / Storm Surge"]);
  const [mobilization, setMobilization] = useState("<24 hours");
  const [crew, setCrew] = useState("6–15");
  const [regions, setRegions] = useState("");
  const [insuranceAck, setInsuranceAck] = useState(false);
  const [attest, setAttest] = useState(false);

  function toggleDisaster(d) {
    setDisasters((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  function onSubmit(e) {
    e.preventDefault();
    // MVP: front-end only. Replace with API call.
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-4">
          <SectionTitle
            eyebrow="Sign up"
            title="Get listed — or apply for verification"
            subtitle="VRN is built to help families find capable help quickly. Providers can apply to be listed and optionally pursue verification badges based on documented readiness indicators."
          />

          <Card className="p-5">
            <div className="text-sm font-semibold text-zinc-900">Choose your path</div>
            <div className="mt-3 grid gap-2">
              <button
                onClick={() => setRole("provider")}
                className={cx(
                  "rounded-xl border px-3 py-2 text-left text-sm",
                  role === "provider"
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white hover:bg-zinc-50"
                )}
              >
                <div className="font-semibold">Provider / Contractor</div>
                <div className={cx("text-xs", role === "provider" ? "text-white/80" : "text-zinc-500")}>
                  Apply to join the registry
                </div>
              </button>
              <button
                onClick={() => setRole("family")}
                className={cx(
                  "rounded-xl border px-3 py-2 text-left text-sm",
                  role === "family"
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white hover:bg-zinc-50"
                )}
              >
                <div className="font-semibold">Family / Community Member</div>
                <div className={cx("text-xs", role === "family" ? "text-white/80" : "text-zinc-500")}>
                  Get updates when new providers are added
                </div>
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-semibold text-zinc-900">What verification means</div>
            <div className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Verification confirms documented readiness indicators at the time of review. It is not an endorsement,
              guarantee, or a promise of availability.
            </div>
            <button
              onClick={() => setRoute("about")}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
            >
              Read our standards <ArrowRight className="h-4 w-4" />
            </button>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <Card className="p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-zinc-900">
                  {role === "provider" ? "Provider onboarding application" : "Family updates"}
                </div>
                <div className="mt-1 text-sm text-zinc-600">
                  {role === "provider"
                    ? "Complete the application below. We’ll follow up with next steps for documentation review."
                    : "Share your email and location so we can notify you when providers are added in your area."}
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Badge>Secure later (MVP)</Badge>
                <Badge>Front-end demo</Badge>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                {role === "provider" ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-zinc-800">Company name</span>
                        <input
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                          placeholder="Your legal business name"
                          required
                        />
                      </label>
                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-zinc-800">HQ location (City, State)</span>
                        <input
                          value={hq}
                          onChange={(e) => setHq(e.target.value)}
                          className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                          placeholder="e.g., Suffolk, VA"
                          required
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-zinc-800">Primary contact name</span>
                        <input
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                          placeholder="First + last name"
                          required
                        />
                      </label>
                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-zinc-800">Phone</span>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                          placeholder="(###) ###-####"
                          required
                        />
                      </label>
                    </div>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-zinc-800">Email</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                        placeholder="name@company.com"
                        required
                      />
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-zinc-800">Typical mobilization window</span>
                        <select
                          value={mobilization}
                          onChange={(e) => setMobilization(e.target.value)}
                          className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                        >
                          <option>&lt;12 hours</option>
                          <option>&lt;24 hours</option>
                          <option>24–48 hours</option>
                          <option>48+ hours</option>
                        </select>
                      </label>
                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-zinc-800">Crew capacity</span>
                        <select
                          value={crew}
                          onChange={(e) => setCrew(e.target.value)}
                          className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                        >
                          <option>1–5</option>
                          <option>6–15</option>
                          <option>16–25</option>
                          <option>25–50</option>
                          <option>50+</option>
                        </select>
                      </label>
                    </div>

                    <div className="grid gap-2">
                      <span className="text-sm font-medium text-zinc-800">Disaster types served</span>
                      <div className="flex flex-wrap gap-2">
                        {DISASTER_TYPES.filter((d) => d !== "Other").map((d) => (
                          <button
                            type="button"
                            key={d}
                            onClick={() => toggleDisaster(d)}
                            className={cx(
                              "rounded-full border px-3 py-1.5 text-sm",
                              disasters.includes(d)
                                ? "border-zinc-900 bg-zinc-900 text-white"
                                : "border-zinc-200 bg-white hover:bg-zinc-50"
                            )}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <div className="text-xs text-zinc-500">Select all that apply.</div>
                    </div>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-zinc-800">Regions served</span>
                      <input
                        value={regions}
                        onChange={(e) => setRegions(e.target.value)}
                        className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                        placeholder="States/regions (e.g., VA, NC, SC; Mid-Atlantic)"
                        required
                      />
                    </label>

                    <div className="grid gap-3 rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 p-4">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={insuranceAck}
                          onChange={(e) => setInsuranceAck(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-zinc-300"
                          required
                        />
                        <span className="text-sm text-zinc-700">
                          I confirm we maintain appropriate insurance and will provide a Certificate of Insurance upon request.
                        </span>
                      </label>
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={attest}
                          onChange={(e) => setAttest(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-zinc-300"
                          required
                        />
                        <span className="text-sm text-zinc-700">
                          I certify the information provided is accurate to the best of my knowledge and understand that VRN verification
                          reflects documented readiness indicators at the time of review and is not a performance guarantee.
                        </span>
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-zinc-800">Email</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                        placeholder="you@example.com"
                        required
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-zinc-800">Location</span>
                      <input
                        value={hq}
                        onChange={(e) => setHq(e.target.value)}
                        className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
                        placeholder="City, State"
                        required
                      />
                    </label>
                    <div className="text-sm text-zinc-600">
                      We’ll only email you when providers are added or updated in your area.
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
                >
                  Submit
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="text-xs text-zinc-500 leading-relaxed">
                  For production, connect to a secure database and include your full Provider Participation Agreement.
                </div>
              </form>
            ) : (
              <div className="mt-6">
                <div className="rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 p-6">
                  <div className="text-lg font-semibold text-zinc-900">Thank you — we received your submission</div>
                  <div className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    {role === "provider"
                      ? "Next: we’ll request supporting documents (insurance COI, relevant licenses/certs, and a brief capabilities summary). Once reviewed, we’ll publish your listing and apply any earned verification badges."
                      : "You’re subscribed for local updates. We’ll send a note when providers are added or updated in your area."}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setRoute("home");
                      }}
                      className="rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
                    >
                      Return to Search
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                      }}
                      className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-50"
                    >
                      Submit another
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="space-y-8">
        <SectionTitle
          eyebrow="About"
          title="Built for families — grounded in clarity and trust"
          subtitle="Verified Response Network (VRN) exists to help families and communities find capable help quickly during natural disasters. Our focus is verification: documented readiness indicators, transparent standards, and a calm experience when time is tight."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-zinc-900">Our verification process</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    We verify documented readiness indicators — not outcomes, availability, or performance.
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                {[
                  ["1) Documentation review", "Providers submit business identifiers, insurance certificates, relevant licenses/certifications, and capability summaries."],
                  ["2) Consistency & plausibility checks", "We look for internal alignment across staffing, equipment, regions served, mobilization claims, and incident history."],
                  ["3) Attestation & update obligations", "Providers attest that submitted information is accurate and agree to update VRN when material changes occur."],
                  ["4) Selective external touchpoints (when needed)", "For higher verification tiers, we may request references or confirm public-facing items such as contract history."],
                  ["5) Re-verification cadence", "Verification status may require periodic renewal (e.g., annual) or document refresh (e.g., updated insurance)."],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 p-4">
                    <div className="text-sm font-semibold text-zinc-900">{t}</div>
                    <div className="mt-1 text-sm text-zinc-600">{d}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-zinc-900">What verification is (and isn’t)</div>
                  <div className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <span className="font-semibold">Is:</span> a review of documented readiness indicators at the time of review.
                      </li>
                      <li>
                        <span className="font-semibold">Isn’t:</span> a guarantee of performance, price, or real-time availability.
                      </li>
                      <li>
                        <span className="font-semibold">Isn’t:</span> a dispatch service or emergency responder.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6">
              <div className="text-lg font-semibold text-zinc-900">Legal + liability statements</div>
              <div className="mt-3 text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  Verified Response Network, LLC (&quot;VRN&quot;) operates a professional registry of service providers who self-report and
                  document capabilities related to emergency and disaster response.
                </p>
                <p>
                  VRN does <span className="font-semibold">not</span> provide emergency response services, dispatch providers, or direct
                  field operations. If you are in immediate danger, call 911 or your local emergency number.
                </p>
                <p>
                  Inclusion in the registry does not constitute endorsement, recommendation, certification of quality, or guarantee of
                  performance. Verification reflects documented information and self-reported readiness at the time of review.
                </p>
                <p>
                  All services are performed solely by independent third-party providers. Users are responsible for conducting their own
                  due diligence prior to engaging any provider.
                </p>
                <p>To the fullest extent permitted by law, VRN disclaims liability arising from reliance on registry information.</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-lg font-semibold text-zinc-900">A note to families</div>
              <div className="mt-3 text-sm text-zinc-600 leading-relaxed space-y-3">
                <p>
                  We built VRN with a simple belief: in stressful moments, people deserve clear information. That’s why we focus on what you
                  can quickly verify — region, response window, and documented indicators.
                </p>
                <p>If you’d like to see more providers in your area, encourage local contractors to apply — and we’ll do the rest.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState("home");

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Nav route={route} setRoute={setRoute} />

      <AnimatePresence mode="wait">
        {route === "home" && (
          <motion.main key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Home />
          </motion.main>
        )}

        {route === "signup" && (
          <motion.main key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Signup setRoute={setRoute} />
          </motion.main>
        )}

        {route === "about" && (
          <motion.main key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <About />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer setRoute={setRoute} />
    </div>
  );
}

