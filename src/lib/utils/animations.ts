/**
 * Svelte action: adds .in-view class when element enters viewport.
 * Used for reveal animations.
 */
export function reveal(node: HTMLElement, options?: IntersectionObserverInit) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    node.classList.add('in-view');
                    observer.unobserve(node); // fire once
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px',
            ...options,
        }
    );

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        },
    };
}

/**
 * Svelte action: tracks scroll progress as CSS custom property on element.
 * Useful for scroll-driven effects where CSS animation-timeline isn't supported.
 */
export function scrollProgress(node: HTMLElement) {
    function update() {
        const rect = node.getBoundingClientRect();
        const windowH = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowH)));
        node.style.setProperty('--scroll-progress', String(progress));
    }

    window.addEventListener('scroll', update, { passive: true });
    update();

    return {
        destroy() {
            window.removeEventListener('scroll', update);
        },
    };
}

/**
 * Svelte action: parallax translate on scroll.
 */
export function parallax(node: HTMLElement, { speed = 0.15 }: { speed?: number } = {}) {
    function update() {
        const rect = node.getBoundingClientRect();
        const windowH = window.innerHeight;
        const centerOffset = (rect.top + rect.height / 2) - windowH / 2;
        node.style.transform = `translateY(${centerOffset * speed}px)`;
    }

    window.addEventListener('scroll', update, { passive: true });
    update();

    return {
        update(opts: { speed?: number }) {
            speed = opts.speed ?? speed;
        },
        destroy() {
            window.removeEventListener('scroll', update);
        },
    };
}
