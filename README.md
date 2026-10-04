# Oxygen 6 and Breakdance builder kit

Skills that teach an AI agent to build sites and WooCommerce stores with Oxygen 6 or Breakdance through the builder's MCP tools. The plugin ships the skills plus a bundled Playwright MCP server; it does not include the builder's MCP server, which each user connects from their own site. Agents without the plugin can still read the skills through the site's `get-skill` tool. Earlier Oxygen versions are not supported.

One plugin marketplace serves Claude Code, Codex and ChatGPT:

```
.claude-plugin/marketplace.json      Claude Code marketplace
.agents/plugins/marketplace.json     Codex / ChatGPT marketplace
plugins/builder-kit/
  .claude-plugin/plugin.json         Claude Code manifest
  plugin.json                        portable agent-plugin manifest (Codex, ChatGPT)
  .codex-plugin/plugin.json          legacy Codex manifest
  .mcp.json                          bundled Playwright MCP server
  skills/<skill>/SKILL.md            the skills
```

This repository is a read-only mirror, published automatically from the Oxygen and Breakdance source; pull requests here are overwritten by the next sync.

## 1. Connect the agent to the site

Enable the MCP server (Oxygen/Breakdance > Settings > Agents & MCP) and create an Application Password (Users > Profile). The endpoint is `https://example.com/wp-json/oxygen/mcp` (or `/wp-json/breakdance/mcp`).

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

**ChatGPT** needs a public HTTPS endpoint (OAuth or anonymous) or OpenAI's Secure MCP Tunnel, since the site uses application-password auth.

## 2. Install the plugin

**Claude Code**

```
/plugin marketplace add soflyy/skills
/plugin install builder-kit@soflyy
```

**Codex CLI**: `codex plugin marketplace add soflyy/skills`, then install `builder-kit` from the Plugins directory.

**ChatGPT (Work mode)**: add a `git-subdir` entry for this repository to `~/.agents/plugins/marketplace.json`, restart the app and install the plugin from the Plugins tab.

**Any agent** ([skills CLI](https://skills.sh)): `npx skills add soflyy/skills` (`-g` for the home directory, `--list` to preview). This installs the skills only, without the Playwright server.

## Playwright

`plugins/builder-kit/.mcp.json` starts the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) headless with the plugin. The skills use it only for the WooCommerce pages a server render can't show (product page, cart, checkout, My Account); everything else is checked with `preview-post`. Drop `--headless` to watch it. With the skills CLI, add it yourself: `claude mcp add playwright -- npx -y @playwright/mcp@latest --headless --isolated`.

## Skills

| Skill | Use |
|---|---|
| `building-sites` | core guidance for any build or edit |
| `design-first-build` | prototype as HTML/CSS files, iterate, then push |
| `building-templates` | templates, headers, footers, archives |
| `mega-menus` | department navigation, mega panels, mobile drawers |
| `patterns` | numbered layout variants for navbars, product grids, accordions and more |
| `dynamic-data` | binding elements to live content |
| `woocommerce-store` | a complete store, in the right order |
| `woocommerce-shop-archive` | shop, category archives, product grids, filters |
| `woocommerce-product-page` | the single product template |
| `woocommerce-cart-checkout` | cart, checkout, order received, mini cart |
| `woocommerce-my-account` | account pages, orders, addresses, login |

## License

GPL-2.0-or-later, see [LICENSE](plugins/builder-kit/LICENSE).

