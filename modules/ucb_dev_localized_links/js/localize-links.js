/**
 * @file
 * Localizes hard-coded absolute paths.
 */

((Drupal, once) => {
  'use strict';

  const live_hosts = ['www.colorado.edu', 'colorado.edu'];
      
  if (live_hosts.includes(window.location.hostname.toLowerCase())) {
    return;
  }

  Drupal.behaviors.localizedLinks = {
    attach: function (context, settings) {
      const site_path = settings.ucb_dev_localized_links?.site_path || null;

      // Can't reasonably rewrite without being synced
      // TODO: account for syncing to the homepage which doesn't have a subpath (if possible)
      if (!site_path) {
        return;
      }

      // www-agnostic link selectors
      const selectors = live_hosts.flatMap((host) => [
        `a[href^="https://${host}/${site_path}"]`,
        `a[href^="http://${host}/${site_path}"]`,
        `a[href^="//${host}/${site_path}"]`,
      ]).join(', ');

      once('localized-links', selectors, context).forEach((link) => {
        // Account for paths with potential overlap, with and without trailing slash
        // e.g. /aerospace and /aerospaceventures
        if (link.pathname !== `/${site_path}` && !link.pathname.startsWith(`/${site_path}/`)) {
          return;
        }

        // Avoid modifying content inside active editors
        if (link.closest('[contenteditable="true"], .ck-editor')) {
          return;
        }   

        console.warn("Absolute path for live version of synced site detected:", link.href);

        // Remove the directory-based portion of the path
        // The +1 is for the leading slash
        const localized_path = link.pathname.slice(site_path.length + 1) || "/";

        // Change to relative path
        link.setAttribute('href', localized_path + link.search + link.hash);

        console.info("Updated link to relative path:", link.href);

      });
    }
  }
})(Drupal, once);