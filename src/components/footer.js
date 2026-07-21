export function renderFooter({ t }) {
  return `
    <footer class="footer border-section">
      <div class="container footer-inner">
        <a class="brand" href="#/"><span class="brand-mark" aria-hidden="true"></span><span>Amadéo</span></a>
        <p>${t("footer.motto")}</p>
        <p>© ${new Date().getFullYear()} Amadéo</p>
      </div>
    </footer>
  `;
}
