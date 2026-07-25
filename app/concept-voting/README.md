# Concept voting

Internal gallery for reviewing Reforger concept screens and collecting yes/no feedback into Notion.

## Routes

| Route | Purpose |
| --- | --- |
| `/concept-voting` | Gallery with keyboard/arrow navigation |
| `/concept-voting/c/[conceptId]` | Direct link to one concept |
| `/concept-voting/api/vote` | Vote persistence API |

## Layout

```text
app/concept-voting/
  page.tsx                 Gallery route
  layout.tsx               Fonts, metadata, theme scope
  theme.css                Route-local design tokens + styles
  c/[conceptId]/page.tsx  Direct concept route
  api/vote/route.ts        POST handler
  components/              Client UI
  lib/                     Concepts, templates, votes, Notion
  templates/               concept-00.html … concept-37.html
```

## Notion setup

1. Create a Notion database named `Concept Votes`.
2. Share it with your internal integration.
3. Add these properties:

| Property | Type |
| --- | --- |
| `Concept` | Title |
| `Concept ID` | Rich text |
| `Collection` | Select |
| `Vote` | Select (`Yes`, `No`) |
| `Comment` | Rich text |
| `Voter` | Rich text |
| `Voter Key` | Rich text |
| `Viewer ID` | Rich text |
| `IP Address` | Rich text |
| `User Agent` | Rich text |
| `Created` | Created time (optional) |

4. Put server-only env vars in `.env.local` (never `NEXT_PUBLIC_`):

```text
NOTION_TOKEN=secret_...
NOTION_VOTES_DB=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

The browser never receives the Notion token. The API validates concept id, vote, voter key, and field lengths, then attaches identity from request headers before creating one Notion row:

- **Voter Key** — stable per browser (`localStorage`)
- **IP Address** — best-effort from `x-forwarded-for` / Vercel headers
- **User Agent** — browser string
- **Viewer ID** — `voterKey|ip` composite for one-click grouping in Notion

### Identifying people when tallying

Group by **Viewer ID** first. Cross-check **Voter Key** vs **IP Address** when someone looks like a repeat (cleared storage, shared office IP, VPN).

The UI locks after one successful vote per concept in that browser (no change/re-vote). Clearing site data can unlock the UI again; Notion may then show a second row — filter by latest `Created` per (`Viewer ID`, `Concept ID`) if needed.

## Local state

Each browser stores in `localStorage` (all writes are try/caught for Safari private mode):

- a random voter key (`v_<uuid>`)
- the last vote per concept (locks the UI)
- an optional display name
- the last gallery concept id (so reload resumes where you left off)

Cross-tab updates sync via the `storage` event. In-flight votes are allowed to finish after you switch concepts, and still write local state even if that VoteBar unmounted.
