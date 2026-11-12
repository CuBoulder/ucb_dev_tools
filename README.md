# CU Boulder Dev Tools

The UCB Dev Tools module is a set of tools and functionality exclusively for use in local development of Web Express sites for CU Boulder.

## Current Submodules

- [Environment Indicator](modules/ucb_env_indicator/README.md)
- [Link Localization](modules/ucb_dev_localized_links/README.md)

## Shared Classes

Classes owned by the parent module (`ucb_dev_tools`) containing static methods for use by any of its submodules.

- [`src/Utility`](src/Utility):
  - [`Env.php`](src/Utility/Env.php)
  - [`Permissions.php`](src/Utility/Permissions.php)