/**
 * Long-form product articles for `/products/[slug]`.
 *
 * ⚠️ EVERY CLAIM HERE WAS READ OFF THE PRODUCT'S OWN LIVE SITE.
 *
 * Prices, feature counts, module names, trial lengths and capability claims
 * were taken from kanninja.com, meetpiggles.com, sparx.works, jotacular.com,
 * agconn.com and silicaui.com
 * in August 2026. Nothing is estimated and nothing is rounded. If a number here
 * disagrees with the product's site, the site is right and this is stale —
 * these are the first things to re-check before launch.
 *
 * ⚠️ AGCONN IS EARLY, AND ITS ARTICLE IS WRITTEN TO SAY SO BY OMISSION.
 *
 * Its site's own impact panel reads "Coming soon" for workers placed, median
 * wage and trainings completed; it lists 2 verified employers and 1 active
 * posting from "Demo Farm Labor Co". The "142 results" and per-county counts in
 * its hero are interface mockup, not inventory.
 *
 * So this article describes what AGCONN DOES — its verification model, its
 * three-role design, its grant alignment — and claims nothing about volume or
 * outcomes. Do not add placement counts, wage medians or testimonials here
 * until AGCONN publishes real ones. docs/landing.md §9 forbids inventing them,
 * and quoting an aspirational figure from a product site onto the parent
 * company's portfolio would launder it into a fact.
 *
 * Kept separate from `products.ts` so the index data stays small — the homepage
 * and footer import that and never pay for this.
 */

export type ArticleSection = {
  heading: string;
  body: string[];
  /** Optional bullet list rendered under the prose. */
  list?: string[];
  /**
   * Optional link out to the product's own site.
   *
   * Used where WizeWorks is pointing AT something the product owns rather than
   * describing it — see the Piggles free-tools section. The traffic belongs to
   * the product, so the link goes there rather than to a WizeWorks copy.
   */
  link?: { href: string; label: string };
};

export type ProductArticle = {
  /** Opening paragraph, sets the problem. */
  lede: string;
  sections: ArticleSection[];
  /** Who the product's own site says it is for. */
  audience?: { heading: string; body: string };
  /** Public pricing, quoted from the product's site. */
  pricing?: { headline: string; detail: string; points: string[] };
};

export const ARTICLES: Record<string, ProductArticle> = {
  /* ---------------------------------------------------------------- Piggles */
  piggles: {
    lede: "It is Thursday night and you are still doing the admin. Bookings live in one app, invoices in another, stock is a spreadsheet, and the customers are in your phone. None of them have ever spoken to each other. That gap — not any one of those tools being bad — is the thing Piggles was built to close.",
    sections: [
      {
        heading: "Fifteen apps that already know about each other",
        body: [
          "Piggles is not a suite of products that integrate. It is one system wearing fifteen faces, which is a different thing entirely. The booking taken on Saturday morning is the invoice you send at lunchtime; you add a line and send it, and nothing was copied from one screen into another.",
          "Selling and counting are not two products here, so they cannot disagree with each other. Sell three bouquets and the shelf count drops. Cross the reorder point and the ribbon tells you before you run out mid-order.",
        ],
      },
      {
        heading: "Your website is not a different company",
        body: [
          "The site shows the same products, the same prices and the same calendar you have been looking at all day. Change one and it changes everywhere, because there is only one of it. No sync, no plugin, no evening spent making the shop window match the shop.",
        ],
      },
      {
        heading: "You open one",
        body: [
          "An ordinary day touches eight apps before six o'clock — bookings, customers, sell, stock, invoices, the site — and you opened one login to do all of it. The other seven were there the whole time: content, suppliers, staff, automations, the rest. Not an upgrade. Not an add-on. Just not needed today.",
        ],
      },
      {
        heading: "Seventeen free tools, and an honest reason for them",
        body: [
          "Piggles gives away seventeen small business tools with no sign-up and no catch — invoices and quotes, a margin calculator, QR codes and barcodes, a digital card, favicon and Open Graph images, meta tags, a contrast checker, a privacy-policy generator and more.",
          "The reason given is the part worth repeating: they are advertising, and Piggles would rather advertise by being useful than by following you around the internet. No email wall at the download step, nothing that stops working after three uses, and no free plan that quietly becomes a trial.",
          "WizeWorks has deliberately NOT rebuilt these here. They belong to Piggles, the traffic should go to Piggles, and a parent company competing with its own product for the same search terms would be a strange way to run a portfolio.",
        ],
        link: {
          href: "https://meetpiggles.com/tools",
          label: "Use the free tools at meetpiggles.com",
        },
      },
      {
        heading: "Where your data actually sits",
        body: [
          "Separation between businesses is enforced by the database rather than by application code, which is the difference between a rule and a promise. Backups run continuously, somewhere other than the live system.",
          "You can export the lot whenever you like — leaving is a supported operation, not a support ticket. And none of it is ever used to train AI: not a model, not anonymised, not ever.",
        ],
      },
    ],
    audience: {
      heading: "Built for people with a shop to open",
      body: "A bakery. A barber. A potter. A garage. Florists, workshops, and the kind of business where the person doing the invoicing is also the person who was on the shop floor an hour ago.",
    },
    pricing: {
      headline: "$99 a month",
      detail: "All fifteen apps included, at one price.",
      points: [
        "Free for 14 days, no card needed",
        "Every app included — nothing held back behind a tier",
        "Founding members pay less, for as long as they stay",
      ],
    },
  },

  /* ------------------------------------------------------------------ sparx */
  sparx: {
    lede: "Most platforms make you take the whole thing. sparx is assembled from parts you switch on — a site, a shop, a CRM, invoicing, email — that all sit on one set of records. Turn a part on and it joins the story you already have. Turn it off and your data stays exactly where it is.",
    sections: [
      {
        heading: "Start with a spark",
        body: [
          "There is no migration when you add a module, because there is nothing to migrate to — the customer who bought from your shop is already the customer in your CRM. There is no second login, and no re-typing.",
          "Switch a module off and it stops billing the same day. Your records do not go anywhere.",
        ],
      },
      {
        heading: "Twelve modules, priced flat",
        body: [
          "Each module is a full product rather than a feature flag, and each is priced on its own so a business only pays for the parts it runs.",
        ],
        list: [
          "Builder — $10/mo · sites, pages, layouts and email, visually authored",
          "Commerce — $49/mo · cart, checkout, orders",
          "CMS — $49/mo · words, media, SEO",
          "CRM — $49/mo · customers, pipeline, signal",
          "AI — $49/mo",
          "Email — $29/mo · transactional and marketing",
          "Inventory — $29/mo",
          "Scheduling — $29/mo",
          "Dropship — $29/mo",
          "Live Chat — $19/mo",
          "Invoicing — free with Commerce or B2B",
        ],
      },
      {
        heading: "Every single thing it does, written down",
        body: [
          "sparx publishes its own feature list in full — 333 capabilities, of which 281 work today, 20 are being built and 32 are planned. Each one says which module it arrives with, so you can search for the thing your business actually needs and find out what it costs before spending anything.",
          "Thirteen areas are free on every plan, whatever you switch on.",
        ],
      },
    ],
    audience: {
      heading: "Whoever you are, it is already for you",
      body: "A maker, a shop, a studio, a workshop, a wholesaler. sparx bends to the business you actually run rather than the other way around — sellers, tailors, salons, studios, dropshippers and retailers all start from the same place and switch on different parts.",
    },
    pricing: {
      headline: "Pay for the parts you use",
      detail: "Modules are priced individually and billed flat, from $10 a month.",
      points: [
        "No card to start",
        "Thirteen areas free on every plan",
        "Switch a module off and it stops billing that day",
      ],
    },
  },

  /* --------------------------------------------------------------- kanNINJA */
  kanninja: {
    lede: "A board should show you the work and then get out of the way. kanNINJA is a kanban built around that idea — the work in front of you, in the order you will finish it, with nothing else asking to be looked at. It calls a card a kata, a board a dojo, and a team a clan, and the vocabulary is the least interesting thing about it.",
    sections: [
      {
        heading: "The kanban that disappears",
        body: [
          "Drag a card and it moves the instant your finger does. Open one in a side panel and the board does not jump. Mobile and keyboard are equal citizens rather than one being the real product and the other an apology.",
          "Cards carry the things work actually accumulates — description, comments, checklists, labels, custom fields, and the file the client emailed at midnight. Time tracking is a timer you start and stop, and the total lands on the card instead of in a spreadsheet.",
        ],
      },
      {
        heading: "Your clan, in real time",
        body: [
          "When somebody moves a card you see it move. Presence avatars show who is on which card right now, which quietly ends the question of who is editing this.",
          "Permissions are three roles, not a tree — enough to match how work is actually divided and not so many that configuring them becomes a job. Notification defaults are quiet on purpose; you decide what reaches you.",
        ],
      },
      {
        heading: "They took the AI out, on purpose",
        body: [
          "Every other board is bolting on an assistant you have to learn. kanNINJA removed its own and instead connects the agent you already pay for — Claude, ChatGPT, Cursor, whatever you already talk to — which then gets 42 tools on your boards over MCP.",
          "That means the board is driven from the chat window you already have open, in the words you already use:",
        ],
        list: [
          "\"File these notes.\" — meeting notes land as cards, on the right columns",
          "\"What am I walking into?\" — everything assigned to you, across every board, in one answer",
          "\"Break this goal down.\" — a whole board, columns and starter cards, in a single call",
          "\"Push everything blocked to Friday.\" — bulk edits land whole or not at all, so there is no half-moved board",
          "\"Who is drowning?\" — assignees and load counted from the cards rather than guessed",
        ],
      },
      {
        heading: "Numbers that do not lie",
        body: [
          "Burndown against what was actually committed, honest about the slope even when the slope is bad. Velocity trended over time rather than ranked as a leaderboard. Cycle time showing where work genuinely slows down.",
          "An audit log records every change with the actor and the timestamp — required for some teams, and quiet for everyone else.",
        ],
      },
    ],
    pricing: {
      headline: "$12 per seat, per month",
      detail: "One price per seat, with nothing held back behind a tier above it.",
      points: [
        "Unlimited seats, billed per seat",
        "Everything included — nothing gated",
        "1 TB of files, and 600 agent calls a minute",
        "Free until you outgrow it",
      ],
    },
  },


  /* ----------------------------------------------------------------- AGCONN */
  agconn: {
    lede: "Finding the next harvest has traditionally meant two weeks of asking around, a contractor whose licence nobody checked, and a wage you learn about on payday. AGCONN puts that on the record instead: verified employers, the rate shown before you apply, and a skills record that belongs to the worker rather than the farm.",
    sections: [
      {
        heading: "One platform, three roles",
        body: [
          "Workers, employers and training organisations each get a purpose-built experience, connected by a single record of work kept in two languages. The three sides are genuinely different products sharing one spine, rather than one dashboard with permissions bolted on.",
          "For workers that means real postings with wages on record, free CDFA and F3 training with bilingual certificates, SMS alerts in their language, and a skills wallet that travels harvest to harvest. For employers it means bilingual postings generated automatically, an applicant board that captures wage at hire, and licence verification before anything goes live. For training organisations it means bilingual programme listings, e-signed certificates, and exports formatted for CDFA, F3 and CalJOBS reporting.",
        ],
      },
      {
        heading: "Sign up with a phone, not an app store",
        body: [
          "Enter a phone number, receive an SMS code, and you are in — no password, no email, no download, in the language you prefer. It takes about a minute.",
          "A résumé is optional. Upload one in any language and it is parsed to pre-fill the profile; skip it and nothing is blocked. The design assumes a phone in a field, not a laptop at a desk.",
        ],
      },
      {
        heading: "Every employer verified by name",
        body: [
          "This is the part that is hard to copy. Farm Labor Contractors must hold an active California DIR/DLSE licence and a federal MSPA registration. Growers are confirmed against the California Secretary of State business registry.",
          "Verification is not a signup checkbox — it is checked by hand before a first posting, then re-checked nightly against the federal DOL list. A lapsed or expired licence is flagged automatically, and both workers and grant officers are notified. Workers see a badge; they never see the raw record.",
        ],
        list: [
          "FLC — California Labor Code §1682 licence, verified manually, then nightly",
          "Grower — business name and EIN against the Secretary of State registry",
          "Lapses flagged automatically, with notification to workers and grant officers",
        ],
      },
      {
        heading: "Built to be reported on",
        body: [
          "AGCONN is aligned with CDFA and F3 grant programmes, and works alongside CalOSBA, local EDD workforce boards, Fresno EOC and California Rural Legal Assistance. That shapes the data model: placements, wages and credentials are captured as records rather than reconstructed later.",
          "Metrics are counted from those records and exportable in WIOA-aligned formats, so a grant officer can pull a defensible report rather than assembling one from spreadsheets.",
        ],
      },
    ],
    audience: {
      heading: "Fresno, Tulare, Kern, Kings and Madera",
      body: "Central Valley farmworkers looking for the next season's work, the growers and labour contractors hiring them, and the training organisations issuing the credentials in between.",
    },
  },

  /* --------------------------------------------------------------- SilicaUI */
  silicaui: {
    lede: "The first five minutes with any component library are always great. Then you need a combobox with real keyboard support, or your brand colour on a component the library never anticipated, and the shine comes off. SilicaUI is built around that second hour rather than the first five minutes — and it is named for element 14, the stuff every chip is etched into.",
    sections: [
      {
        heading: "Behaviour underneath, CSS on top",
        body: [
          "Interactive components wrap Base UI, so focus management, keyboard navigation and ARIA roles are built in rather than left as an exercise. The styling is real CSS classes rather than runtime CSS-in-JS, which is what lets the same components render outside React at all.",
          "That combination is the whole argument. CSS-only libraries give you semantic classes and stop exactly where the hard part starts — a dialog that looks right but traps focus nowhere. Component libraries with behaviour usually assume React and a bundle to go with it.",
        ],
      },
      {
        heading: "Pick a colour. Watch it cascade.",
        body: [
          "Every colour is an OKLCH design token. Register one named colour and it re-tints every variant of every component — no rebuild, no safelist, no per-theme stylesheet to maintain.",
          "Legible foregrounds are derived by measured contrast rather than a lightness threshold, so a colour invented at runtime by a tenant in a theme editor behaves exactly like one shipped in the library. Twenty theme presets come in the box; a theme is applied by putting one attribute on an element, and it nests, so a dark band inside a light page is an attribute rather than a parallel set of rules.",
        ],
      },
      {
        heading: "Three synchronized layers",
        body: [
          "The same components ship three ways, and they stay in step because they are generated from one vocabulary of colour × variant × size × shape.",
        ],
        list: [
          "React — typed components on Base UI, for React 19 and up",
          "Framework-neutral HTML — a node tree that projects to markup, for static sites, server-rendered pages and other frameworks",
          "Vanilla — a zero-dependency runtime that hydrates the same markup, so a static site gets accessible primitives without shipping React",
        ],
      },
      {
        heading: "The consistency is enforced, not promised",
        body: [
          "A size prop that works on the button but silently does nothing on the empty state is the kind of gap you only find by hitting it. In SilicaUI every sized component implements the same five steps, and a build probe fails if one of them goes missing — so \"size\" means the same thing everywhere, by construction.",
          "Layout follows the same instinct: container queries rather than viewport breakpoints, because a breakpoint is the wrong unit for a component living inside a sidebar.",
        ],
      },
      {
        heading: "116 components across 13 packages",
        body: [
          "A core installed together, plus opt-in packages you add only if you need them — charts wrapping ECharts, tables wrapping TanStack, a TipTap editor, drag-and-drop over dnd-kit, resizable panels, and a visual document builder.",
          "It is open source and free.",
        ],
      },
      {
        heading: "This site is built on it",
        body: [
          "The page you are reading is a SilicaUI application. The WizeWorks palette is declared once as a theme; the dark bands are the same components under a nested theme attribute, with no dark-mode variants anywhere in the codebase.",
          "That is the most honest thing WizeWorks can say about it — not that the library is good, but that we reached for it when we had to build something ourselves.",
        ],
      },
    ],
    audience: {
      heading: "For people who have already outgrown the first five minutes",
      body: "Teams who need a combobox with real keyboard support, a brand colour that cascades without a rebuild, and the same accessible components on a static page as in a React app.",
    },
    pricing: {
      headline: "Free, and open source",
      detail: "Installed from npm as versioned packages rather than copied into your repo.",
      points: [
        "npm i @wizeworks/silicaui-react",
        "Works with React 19+, or any HTML environment via the node-tree and vanilla runtime",
        "Requires Tailwind CSS v4",
      ],
    },
  },
  /* ------------------------------------------------------------- jotacular */
  jotacular: {
    lede: "There is a notes app on your phone right now with four things in it, two of them from 2023. It is not a bad app. It asked you to keep a system going, and systems are a thing you maintain on a good week. jotacular does not ask.",
    sections: [
      {
        heading: "Four seconds, and any kind of thought",
        body: [
          "Whatever you were holding when the thought turned up is the way in. The cursor is already blinking — nothing to name, nowhere to file it, no new-note button to hunt for first.",
        ],
        list: [
          "Write — pen to glass, in your own hand. It stays your handwriting, and it is still findable in November by one word you wrote in March.",
          "Type — the ordinary way, with nothing in front of it.",
          "Speak — say it at a red light with both hands where they belong. It comes back as words you can search.",
          "Snap — a whiteboard before someone wipes it, a receipt, the page of notes somebody else took.",
        ],
      },
      {
        heading: "Capture now, use later",
        body: [
          "The point of a note is not filing it. It is finding it again — and increasingly, it is handing it to whatever you think with next.",
          "Your jots become context wherever you already work. Paste one link into Claude's settings, or ChatGPT's, sign in, and pick which spaces it may reach. That is the whole setup, you do it once, and your laptop can stay shut — there is no machine left running at home to serve them.",
        ],
      },
      {
        heading: "A short list of what it will never grow into",
        body: [
          "Filing was never what made a note worth keeping, so the product refuses the features that turn notes into a second job:",
        ],
        list: [
          "No filing before you can write",
          "No folder trees, no databases, no formulas",
          "No graph view, no backlinks, no daily-note methodology",
          "No due dates — a note is not a task",
        ],
      },
      {
        heading: "Yours, and only yours",
        body: [
          "Connecting an agent is a decision you make once and unmake in a second. Nothing reaches your notes until you say so, per space and per agent, and nothing reads them on a schedule unless you switched that on yourself.",
          "Every note exports as markdown that opens anywhere. Leaving is a supported operation, not a support ticket.",
        ],
      },
    ],
    audience: {
      heading: "A place to put things, not a system to maintain",
      body: "It sits beside whatever you already use rather than replacing it, and hands your agent the part you scribbled.",
    },
  },
};

export function articleFor(slug: string): ProductArticle | undefined {
  return ARTICLES[slug];
}
