(function () {
    const eventsContainer = document.querySelector('[data-events-list]');
    const modalElement = document.getElementById('eventModal');
    if (!eventsContainer || !modalElement) {
        return;
    }

    if (typeof bootstrap === 'undefined' || typeof bootstrap.Modal === 'undefined') {
        return;
    }

    const modal = new bootstrap.Modal(modalElement);
    const modalTitle = modalElement.querySelector('[data-modal-title]');
    const modalDate = modalElement.querySelector('[data-modal-date]');
    const modalLocation = modalElement.querySelector('[data-modal-location]');
    const modalDescription = modalElement.querySelector('[data-modal-description]');
    const modalCta = modalElement.querySelector('[data-modal-cta]');
    const modalTags = modalElement.querySelector('[data-modal-tags]');

    fetch('assets/data/events.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Unable to load events.');
            }
            return response.json();
        })
        .then((events) => {
            if (!Array.isArray(events) || events.length === 0) {
                eventsContainer.innerHTML = '<p class="text-secondary">New events are on the way. Check back soon!</p>';
                return;
            }

            const sorted = events.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
            const fragment = document.createDocumentFragment();

            sorted.forEach((event) => {
                const card = createEventCard(event);
                fragment.appendChild(card);
            });

            eventsContainer.innerHTML = '';
            eventsContainer.appendChild(fragment);

            eventsContainer.addEventListener('click', (event) => {
                const card = event.target.closest('[data-event-card]');
                if (!card) {
                    return;
                }
                const eventId = card.getAttribute('data-event-card');
                const selected = sorted.find((item) => item.id === eventId);
                if (!selected) {
                    return;
                }

                populateModal(selected);
                modal.show();
            });
        })
        .catch(() => {
            eventsContainer.innerHTML = '<p class="text-danger">We had trouble loading events. Please refresh the page.</p>';
        });

    function createEventCard(event) {
        const column = document.createElement('div');
        column.className = 'col';

        const card = document.createElement('article');
        card.className = 'event-card card shadow-sm h-100 border-0';
        card.setAttribute('data-event-card', event.id);

        const body = document.createElement('div');
        body.className = 'card-body';

        const title = document.createElement('h3');
        title.className = 'h5 fw-semibold';
        title.textContent = event.title;

        const meta = document.createElement('p');
        meta.className = 'event-meta text-primary fw-semibold';
        meta.textContent = buildMeta(event);

        const summary = document.createElement('p');
        summary.className = 'text-secondary mb-0';
        summary.textContent = event.summary;

        const tags = document.createElement('div');
        tags.className = 'event-tags d-flex flex-wrap gap-2 mb-3';
        renderTags(tags, event.tags);

        body.appendChild(tags);
        body.appendChild(title);
        body.appendChild(meta);
        body.appendChild(summary);
        card.appendChild(body);

        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${event.title}`);

        card.addEventListener('keydown', (keyboardEvent) => {
            if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                keyboardEvent.preventDefault();
                card.click();
            }
        });

        column.appendChild(card);
        return column;
    }

    function populateModal(event) {
        modalTitle.textContent = event.title;
        modalDate.textContent = buildMeta(event, { includeLocation: false });
        if (event.location) {
            modalLocation.textContent = event.location;
            modalLocation.classList.remove('d-none');
        } else {
            modalLocation.textContent = '';
            modalLocation.classList.add('d-none');
        }
        modalDescription.textContent = event.description;

        if (event.cta && event.cta.url) {
            modalCta.classList.remove('d-none');
            modalCta.href = event.cta.url;
            modalCta.textContent = event.cta.label || 'Learn more';
        } else {
            modalCta.classList.add('d-none');
        }

        renderTags(modalTags, event.tags);
    }

    function buildMeta(event, options = {}) {
        const { includeLocation = true } = options;
        const date = new Date(event.date);
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });

        const startTime = event.startTime ? formatTime(event.date, event.startTime, timeFormatter) : null;
        const endTime = event.endTime ? formatTime(event.date, event.endTime, timeFormatter) : null;

        let result = dateFormatter.format(date);
        if (startTime && endTime) {
            result += ` • ${startTime} - ${endTime}`;
        } else if (startTime) {
            result += ` • ${startTime}`;
        }

        if (includeLocation && event.location) {
            result += ` • ${event.location}`;
        }

        return result;
    }

    function formatTime(dateString, timeString, formatter) {
        const [hours, minutes] = timeString.split(':');
        const date = new Date(dateString);
        date.setHours(Number.parseInt(hours, 10));
        date.setMinutes(Number.parseInt(minutes, 10));
        return formatter.format(date);
    }

    function renderTags(container, tags = []) {
        container.innerHTML = '';
        if (!Array.isArray(tags) || tags.length === 0) {
            container.classList.add('d-none');
            return;
        }

        container.classList.remove('d-none');
        tags.forEach((tag) => {
            const badge = document.createElement('span');
            badge.className = 'badge rounded-pill text-bg-primary-subtle';
            badge.textContent = tag;
            container.appendChild(badge);
        });
    }
})();
