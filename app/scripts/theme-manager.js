// Theme management system for DOS Friend's Hub
class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme()
    this.themes = ["light", "dark", "high-contrast", "colorful", "minimal", "spring", "summer", "autumn", "winter"]
    this.init()
  }

  init() {
    this.applyTheme(this.currentTheme)
    this.createThemeToggle()
    this.setupEventListeners()
  }

  getSystemTheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
    if (window.matchMedia("(prefers-contrast: high)").matches) {
      return "high-contrast"
    }
    return "light"
  }

  getStoredTheme() {
    return localStorage.getItem("dos-theme")
  }

  storeTheme(theme) {
    localStorage.setItem("dos-theme", theme)
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    this.currentTheme = theme
    this.storeTheme(theme)
    this.updateThemeToggle()
    this.dispatchThemeChange()
  }

  cycleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme)
    const nextIndex = (currentIndex + 1) % this.themes.length
    this.applyTheme(this.themes[nextIndex])
  }

  createThemeToggle() {
    const toggle = document.createElement("button")
    toggle.className = "theme-toggle"
    toggle.setAttribute("aria-label", "Toggle theme")
    toggle.innerHTML = this.getThemeIcon()
    toggle.addEventListener("click", () => this.cycleTheme())
    document.body.appendChild(toggle)
    this.toggleButton = toggle
  }

  updateThemeToggle() {
    if (this.toggleButton) {
      this.toggleButton.innerHTML = this.getThemeIcon()
    }
  }

  getThemeIcon() {
    const icons = {
      light: "☀️",
      dark: "🌙",
      "high-contrast": "🔲",
      colorful: "🌈",
      minimal: "⚪",
      spring: "🌸",
      summer: "☀️",
      autumn: "🍂",
      winter: "❄️",
    }
    return icons[this.currentTheme] || "🎨"
  }

  setupEventListeners() {
    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? "dark" : "light")
      }
    })

    // Listen for contrast preference changes
    window.matchMedia("(prefers-contrast: high)").addEventListener("change", (e) => {
      if (!this.getStoredTheme() && e.matches) {
        this.applyTheme("high-contrast")
      }
    })
  }

  dispatchThemeChange() {
    const event = new CustomEvent("themechange", {
      detail: { theme: this.currentTheme },
    })
    document.dispatchEvent(event)
  }

  // Public API
  setTheme(theme) {
    if (this.themes.includes(theme)) {
      this.applyTheme(theme)
    }
  }

  getTheme() {
    return this.currentTheme
  }

  getAvailableThemes() {
    return [...this.themes]
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.themeManager = new ThemeManager()
})

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = ThemeManager
}
