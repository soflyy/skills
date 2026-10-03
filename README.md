# Oxygen 6 and Breakdance builder kit

Skills that teach an AI agent how to build sites and complete WooCommerce stores with the Oxygen 6 (or Breakdance) builder through its MCP tools. The plugin ships the **skills** and a bundled **Playwright MCP server** for looking at the result in a real browser; it does not ship the builder's MCP server itself. Each user connects the agent to their own WordPress site's MCP endpoint, then installs this plugin so the agent knows how to use it well. The same skills are also served by the site's MCP server through its `get-skill` tool (a copy lives in the WordPress plugin), so an agent without the plugin can still read them; the plugin adds automatic triggering from the user's words and file-level reading. The tools and skills target Oxygen 6 and Breakdance; earlier Oxygen versions are a different builder and are not supported.

This is a plugin marketplace with one plugin, laid out so the same files serve Claude Code, Codex and ChatGPT:

```
.claude-plugin/marketplace.json      Claude Code marketplace
.agents/plugins/marketplace.json     Codex / ChatGPT marketplace
plugins/builder-kit/
  .claude-plugin/plugin.json         Claude Code manifest
  plugin.json                        portable agent-plugin manifest (Codex, ChatGPT)
  .codex-plugin/plugin.json          legacy Codex manifest
  .mcp.json                          bundled MCP servers (Playwright), read by Claude Code and Codex
  skills/<skill>/SKILL.md            the skills (shared by every client)
```

The layout is also what the [skills CLI](https://skills.sh) reads (it follows `.claude-plugin/marketplace.json` to the plugin's `skills/` folder), so the same repository installs with `npx skills add` into any agent that reads `SKILL.md` files.

This repository is a read-only mirror, published automatically from the Oxygen and Breakdance source; pull requests here are overwritten by the next sync.

## 1. Connect the agent to the site (per user)

The site needs the builder's MCP server enabled (Oxygen/Breakdance > Settings > Agents & MCP) and an Application Password for the WordPress user (Users > Profile > Application Passwords). The endpoint is `https://example.com/wp-json/oxygen/mcp` (or `/wp-json/breakdance/mcp`).

**Claude Code**

```bash
claude mcp add oxygen \
  -e WP_API_URL=https://example.com/wp-json/oxygen/mcp \
  -e WP_API_USERNAME=admin \
  -e WP_API_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx" \
  -- npx -y @automattic/mcp-wordpress-remote
```

**Codex CLI** (`~/.codex/config.toml`)

```toml
[mcp_servers.oxygen]
command = "npx"
args = ["-y", "@automattic/mcp-wordpress-remote"]
env = { WP_API_URL = "https://example.com/wp-json/oxygen/mcp", WP_API_USERNAME = "admin", WP_API_PASSWORD = "xxxx xxxx xxxx xxxx xxxx xxxx" }
```

**ChatGPT** cannot run a local proxy. It connects to a public HTTPS MCP endpoint through Plugins > add connection, using OAuth or anonymous access, or through OpenAI's Secure MCP Tunnel. The WordPress endpoint uses application-password auth today, so ChatGPT users need either the tunnel or an OAuth-capable endpoint in front of the site.

## 2. Install the plugin

**Any agent, with the skills CLI** (Claude Code, Codex, Cursor, Copilot, Windsurf, Gemini CLI and the rest of the agents [skills.sh](https://skills.sh) supports)

```bash
npx skills add soflyy/builder-kit          # into this project, symlinked per agent
npx skills add soflyy/builder-kit -g       # into the user's home directory instead
npx skills add soflyy/builder-kit --list   # see the skills without installing
```

This installs the skills only (no plugin manifest and no bundled MCP server): the agent reads them from its own skills folder and triggers them from the user's words exactly as it would from the installed plugin. Add the Playwright MCP server yourself if you want the browser checks (see below). `npx skills update` refreshes them later. To install one skill or target one agent: `npx skills add soflyy/builder-kit --skill woocommerce-store -a claude-code`.

**Claude Code** (plugin marketplace)

```
/plugin marketplace add soflyy/builder-kit
/plugin install builder-kit@soflyy
```

**Codex CLI**

```bash
codex plugin marketplace add soflyy/builder-kit
```

then install `builder-kit` from the Plugins directory (or `codex plugin install builder-kit`).

**ChatGPT (Work mode)**: add the marketplace to `~/.agents/plugins/marketplace.json` on the machine running the ChatGPT desktop app (a `git-subdir` entry pointing at this repository), restart the app, and install Oxygen 6 & Breakdance Builder Kit from the Plugins tab. Skills-only plugins are supported.

## Bundled Playwright MCP server

`plugins/builder-kit/.mcp.json` registers the official [Playwright MCP server](https://github.com/microsoft/playwright-mcp) (`npx -y @playwright/mcp@latest --headless --isolated`) alongside the skills. Claude Code and Codex start it with the plugin; its `browser_*` tools let the agent open a page in a real browser, take screenshots, resize to the site's breakpoints, fill forms and click. It runs headless in an isolated profile by default since the agent only ever screenshots or scripts against the page, never a human, so no visible window or shared browser state is needed. The skills reserve it for the four WooCommerce pages whose behaviour the builder's `preview-post` (server-rendered HTML, no session, no JS) cannot show: the single product page (variation price, add-to-cart), the cart (a real session with items), the checkout (a test order through to order received) and My Account (logged in and out). Everything else, landing pages, headers, footers, templates and archives included, is checked with `preview-post` as before, and the agent is told not to open a browser for it. The server needs Node and, on first run, a Chromium download; the agent is told never to make a build wait on that.

To watch it run headed instead (for example, to debug it yourself), drop `--headless` from the `args`; in Claude Code a user can also disconnect the server for a project from `/mcp`. With the skills-CLI install nothing is registered automatically: `claude mcp add playwright -- npx -y @playwright/mcp@latest --headless --isolated` adds the same server by hand.

## Skills

| Skill | Use |
|---|---|
| `building-sites` | core guidance for any build or edit |
| `design-first-build` | prototype the site as HTML/CSS files, render, iterate, then convert mocks to markers and push |
| `building-templates` | reusable templates, headers, footers, archives |
| `mega-menus` | department navigation, mega panels, flyouts, mobile drawers |
| `patterns` | Relume-style numbered layout variants: navbars and mega menus, product headers, product grids, accordions, quantity steppers, loop cart button states, notices |
| `dynamic-data` | binding elements to live content |
| `woocommerce-store` | a complete store, in the right order |
| `woocommerce-shop-archive` | shop, category archives, product grids, filters |
| `woocommerce-product-page` | the single product template |
| `woocommerce-cart-checkout` | cart (four designs), checkout (three designs, slim header, express pay), order received, mini cart, promo bars |
| `woocommerce-my-account` | account frames, orders as cards, order receipt, addresses, three login designs, order tracking |

