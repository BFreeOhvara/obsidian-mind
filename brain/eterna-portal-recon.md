# Eterna Portal — Structure Recon
(Reference only — documents portal navigation, fields, columns, statuses, and filters as observed 2026-07-21, via Claude Chrome. Account used had zero live data, so some status dropdowns only showed "All" — noted where that applies.)

## Global elements
Every section shares a top filter bar with some combination of: agent/downline search box, "All Downlines" vs "Agent" toggle, "All programs" dropdown, "All carriers" dropdown, and a date-range picker. Most pages also show a breadcrumb-style "Hierarchy" line, e.g. Eterna Insurance Solutions › Lindsay Salters › N8closes › brayden Freeman.

## 1. Effectuation Report
`/effectuation-dashboard`. Metric tiles: Effectuated AP, Effectuated Policies, Bonus AP, Cancelled AP, Net AP, Potential AP, Sub to Eff Avg, Cancelled Policies, Net Policies, Potential Policies, RCB Percentage. "Projected Producer Bonus" widget (Last/MTD toggle): Estimated Bonus, Next tier at ($), Unlocks (+$ bonus), Need ($ to next tier).

Charts: "Monthly Eff. Trend" / "Submission Breakdown" toggle; "Cancellation Breakdown" bucketed by age — 0-7 days, 8-30 days, 31-90 days, 90+ days (count, %, $AP each) — with a matching "Share of Cancellations" chart.

Data table (Overview / Downlines / Policy Activity tabs, Export CSV): Agent Name, Effectuated AP, Effectuated Policies, Cancelled AP, Cancelled Policies, Net AP, Net Policies, Potential AP, Potential Policies, Sub to Eff Avg, RCB Percentage, Chargeback Details.

## 2. Policies
`/policies`, "My Policies." Filters: agent search, All Downlines/Agent toggle, program/carrier dropdowns, date range, policy-number search, status dropdown (only "All" populated). Columns: Policy Number, Agent Name, AP, Date Reported, Carrier, Customer Name, Status, Details.

## 3. Action Needed
Sidebar label "Action Needed," page titled "Take Action" (`/take-action`). Same global filters + own status dropdown (only "All" populated). Columns: Action Status, Policy Number, Agent Name, AP, Date Reported, Carrier, Customer Name, Policy Status, Updates.

## 4. Hierarchies
`/hierarchies`, "Agent Hierarchy" (interactive org chart). Filters: programs dropdown, date picker. Controls: Expand All, Collapse All, Reset View, Simplify view, zoom, fullscreen. Cards show avatar/initials, name, program tag (Spark/Limitless/Legacy/Ignite), and a "Tier: ##" value for individual agents. Observed chain: Eterna Insurance Solutions → Lindsay Salters (Limitless) → N8closes (Limitless) → brayden Freeman (Limitless, Tier 90).

## 5. Commissions (4 sub-pages)

**5a. Compensation Grid** (`/compensation`) — Carrier + product-type filters, "Life commission tier: 90" label. Matrix table: Carrier, Type, Product rows × tier-level columns (50, 55, 60...145 by 5s), each cell a commission %. Rows are real carrier products (F&G IUL "Everlast," Corebridge WL "SimpliNow Legacy," Ethos TL "Term Life - Choice," MOO, Augustar, Foresters, Transamerica, NLG, SBLI, Fidelity Life, American Amicable, etc.).

**5b. Agent Balances** (`/commissions/agent-profile`) — All/Summary toggle. Columns: Agent, Program, Life Comm Tier, Commission Balance, Reserve Balance, Carrier Debt, Last Commission, View Transactions action.

**5c. Transactions** (`/commissions/transactions`) — Header: Agent, NPN, Program, Last Commission, Export, date range. Summary cards: Commission Balance (Opening/Change/Ending), Total Deposited, Reserve Balance (Opening/Change/Ending). "Ledger Entries" table: Processed At, Submission Date, Policy #, Writing Agent, Carrier, Product, Payment Type, Commission Type, Product %, Gross, Commission, Reserve.

**5d. Debt Disposition** (`/commissions/debt-tracker`) — Direct Debt / Carrier tabs. Empty-state banner ("No outstanding debt — you're all clear!"), "Payment History" panel with record count. Carrier tab: guidance to call carriers proactively, note that debt aging past 45 days with no resolution moves an account to "as-earned" status. Disclaimer: carrier debt balances are as-reported, not real-time.

## 6. Eterna Leaderboard
`/leaderboard`. Toggles: Agents/Teams, Daily/Monthly, month/year selectors.

Agents view — top-3 Spotlight cards (TOP PERFORMER / SECOND PLACE / THIRD PLACE): Annual Premium, Avg Premium, Families, "X× Top 10" badge. Standings table (ranks 4-10): Rank, Agent, Submitted AP, Avg Premium, Families, Top 10 count, "NEW" badges.

Teams view — same pattern (TOP TEAM etc.): Annual Premium, Avg Premium, Policies, "X Agents" badge. Standings: Rank, Team, Submitted AP, Avg Premium, Policies, Agents.

## 7. Calls

**7a. Transcripts** (`/transcripts`), "AI Transcripts." Filters: agent search, customer search, All Downlines/Agent toggle, date range, status dropdown (only "All" populated). Columns: Date, Agent Name, Customer Name, Platform, Call Time, Policy, Rec Status, Call Recording, Actions. Footnote: transcripts only generated for calls longer than 10 minutes.

**7b. Call Analysis** — not reachable on this account (redirected to `/dashboard`), structure undocumented.

## 8. Agent Management
Links out to a separate subdomain (`agent.goeterna.com`, "Eterna Onboarding," SSO'd automatically). Own sidebar: My Requests, Change Request, Contracting Status, Back to Portal.

**8a. My Requests** — Onboarding Invites tab (filters: Upline, Status; tiles: Total, Agent Pending, Admin Pending, Completed, Failed, Invalid, each with count + % of total) and Change Requests tab (filters: Requestor, Type, Status; tiles: Total, Pending, Approved, Completed, Failed/Rejected).

**8b. Change Request** (`/change-form`) — "Submit a Change Request" form. Step 1 multi-select grouped "For Yourself" (Bank Account Details Change, Add a State License, Request Release) and "For a Downline Agent" (Program Type Change, Upline Change, Commission Tier Change, Commission Advance Change, Paid As Earned, Paid On Issues, Paid On Pay, Add a State License, Agent Release, Agent Terminate). Step 3: Request Effective Date, Additional Recipients, Submit.

**8c. Contracting Status** (`/contracting`) — Filters: All Downlines/Agent toggle, programs dropdown, Export. Columns: Agent Name, Program, Commission Tier, Progress ("X of Y"), then one column per carrier (Mutual of Omaha, TransAmerica, Ethos, Fidelity & Guaranty, Foresters, NLG, Corebridge, Fidelity Life, SBLI, Augustar, North American, American Amicable) — each cell a status badge: N/A, Not Started, Sent to Carrier (+date), Completed (+date), Discarded.

## Scope note
Sections 4 (Hierarchies) and 8 (Agent Management) are built around Eterna's IMO/downline-recruiting business model — agents recruiting sub-agents, multi-tier commission overrides, carrier contracting/appointment workflows. Ohvara has no recruiting/downline structure (flat closer + admin team) — these two sections are likely not directly transferable and are excluded from the Ohvara-facing brief unless the business model changes to include agent recruiting.
