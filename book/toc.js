// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item affix "><li class="part-title">TOPAZ LEAF</li><li class="chapter-item "><a href="ubuntu-software/ubuntu_software.html"><strong aria-hidden="true">1.</strong> Ubuntu Software</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="ubuntu-software/google_input_install.html"><strong aria-hidden="true">1.1.</strong> Install Google-PinYin</a></li><li class="chapter-item "><a href="ubuntu-software/wechat_install.html"><strong aria-hidden="true">1.2.</strong> Install Wechat</a></li><li class="chapter-item "><a href="ubuntu-software/clash_verge_install.html"><strong aria-hidden="true">1.3.</strong> Install Clash-Verge</a></li><li class="chapter-item "><a href="ubuntu-software/docker_install.html"><strong aria-hidden="true">1.4.</strong> Install Docker</a></li><li class="chapter-item "><a href="ubuntu-software/pycharm_crack.html"><strong aria-hidden="true">1.5.</strong> Crack Pycharm</a></li><li class="chapter-item "><a href="ubuntu-software/entertainment.html"><strong aria-hidden="true">1.6.</strong> Entertainment</a></li><li class="chapter-item "><a href="ubuntu-software/tmux.html"><strong aria-hidden="true">1.7.</strong> Tmux &amp; Plugins</a></li><li class="chapter-item "><a href="ubuntu-software/vim_support_system_clipboard.html"><strong aria-hidden="true">1.8.</strong> Vim Support System Clipboard</a></li></ol></li><li class="chapter-item "><a href="zsh/zsh.html"><strong aria-hidden="true">2.</strong> ZSH</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="zsh/oh-my-zsh.html"><strong aria-hidden="true">2.1.</strong> oh-my-zsh</a></li><li class="chapter-item "><a href="zsh/powerlevel10k.html"><strong aria-hidden="true">2.2.</strong> powerlevel10K</a></li><li class="chapter-item "><a href="zsh/zsh-autosuggestions.html"><strong aria-hidden="true">2.3.</strong> zsh-autosuggestions</a></li><li class="chapter-item "><a href="zsh/zsh-syntax-highlighting.html"><strong aria-hidden="true">2.4.</strong> zsh-syntax-highlighting</a></li><li class="chapter-item "><a href="zsh/zsh-you-should-use.html"><strong aria-hidden="true">2.5.</strong> zsh-you-should-use</a></li><li class="chapter-item "><a href="zsh/zsh-ollama-completion.html"><strong aria-hidden="true">2.6.</strong> zsh-ollama-completion</a></li><li class="chapter-item "><a href="zsh/zsh-custom-plugins.html"><strong aria-hidden="true">2.7.</strong> custom plugins</a></li><li class="chapter-item "><a href="zsh/zsh-custom-themes.html"><strong aria-hidden="true">2.8.</strong> custom themes</a></li></ol></li><li class="chapter-item "><a href="env_variable_setting.html"><strong aria-hidden="true">3.</strong> Setting ENV</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="bashrc_setting.html"><strong aria-hidden="true">3.1.</strong> Basic .bashrc</a></li><li class="chapter-item "><a href="user-dirs.dirs_setting.html"><strong aria-hidden="true">3.2.</strong> .user-dirs.dirs</a></li></ol></li><li class="chapter-item "><a href="vim_plugin_manager.html"><strong aria-hidden="true">4.</strong> Vim &amp; Plugins</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="vimrc_basic_setting.html"><strong aria-hidden="true">4.1.</strong> Basic .vimrc</a></li><li class="chapter-item "><a href="nerdtree.html"><strong aria-hidden="true">4.2.</strong> NerdTree</a></li><li class="chapter-item "><a href="nerdtree-git.html"><strong aria-hidden="true">4.3.</strong> NerdTree-Git</a></li><li class="chapter-item "><a href="ycm.html"><strong aria-hidden="true">4.4.</strong> YouCompleteMe</a></li></ol></li><li class="chapter-item "><a href="fzf.html"><strong aria-hidden="true">5.</strong> FZF</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="fzf_completion.html"><strong aria-hidden="true">5.1.</strong> FZF Replace Bash Completion</a></li><li class="chapter-item "><a href="fzf_integrate_git.html"><strong aria-hidden="true">5.2.</strong> FZF Integrate Git</a></li></ol></li><li class="chapter-item "><a href="kinds_proxy_setting.html"><strong aria-hidden="true">6.</strong> Proxy Configuration</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="system_proxy_setting.html"><strong aria-hidden="true">6.1.</strong> System Proxy</a></li><li class="chapter-item "><a href="docker_proxy_setting.html"><strong aria-hidden="true">6.2.</strong> Docker Proxy</a></li><li class="chapter-item "><a href="container_proxy_setting.html"><strong aria-hidden="true">6.3.</strong> Container Proxy</a></li><li class="chapter-item "><a href="k3s_proxy_setting.html"><strong aria-hidden="true">6.4.</strong> K3S Proxy</a></li></ol></li><li class="chapter-item "><a href="useful_scripts.html"><strong aria-hidden="true">7.</strong> Useful Scripts</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="node_version_control.html"><strong aria-hidden="true">7.1.</strong> Switch Node Version</a></li><li class="chapter-item "><a href="docker_proxy_start_stop.html"><strong aria-hidden="true">7.2.</strong> Docker Proxy ON &amp; OFF</a></li><li class="chapter-item "><a href="docker_push_registry.html"><strong aria-hidden="true">7.3.</strong> Docker Push Private Registry</a></li></ol></li><li class="chapter-item "><a href="keyboard_layout.html"><strong aria-hidden="true">8.</strong> Keyboard Layout</a></li><li class="chapter-item "><a href="disable_sleep.html"><strong aria-hidden="true">9.</strong> Disable Hibernation</a></li><li class="chapter-item "><a href="windterm_desktop.html"><strong aria-hidden="true">10.</strong> WindTerm Desktop</a></li><li class="chapter-item "><a href="frp_usage.html"><strong aria-hidden="true">11.</strong> FRP Usage</a></li><li class="chapter-item "><a href="asciiquarium_usage.html"><strong aria-hidden="true">12.</strong> Asciiquarium</a></li><li class="chapter-item "><a href="kns_usage.html"><strong aria-hidden="true">13.</strong> kns Usage</a></li><li class="chapter-item "><a href="clash_for_linux.html"><strong aria-hidden="true">14.</strong> Clash For Linux</a></li><li class="chapter-item "><a href="command.html"><strong aria-hidden="true">15.</strong> Command</a></li><li class="chapter-item "><a href="vscode_remote_usage.html"><strong aria-hidden="true">16.</strong> VS-Code Link Remote Host</a></li><li class="chapter-item "><a href="ollama_services_found.html"><strong aria-hidden="true">17.</strong> Ollama Service Discovery</a></li><li class="chapter-item "><a href="funny_docker_projects.html"><strong aria-hidden="true">18.</strong> Funny Docker Projects</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="openweb-ui.html"><strong aria-hidden="true">18.1.</strong> Openweb-UI</a></li><li class="chapter-item "><a href="yesplaymusic.html"><strong aria-hidden="true">18.2.</strong> Yesplaymusic</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
