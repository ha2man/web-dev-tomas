const {html} = require('common-tags');
const {DateTime} = require('luxon');

/* eslint-disable require-jsdoc */

module.exports = ({post, author, showSocialMedia = false}) => {
  if (!post) {
    throw new Error(`Can't generate AuthorInfo without post object`);
  }

  if (!author) {
    throw new Error(`Can't generate AuthorInfo without author object`);
  }

  const fullName = `${author.name.given} ${author.name.family}`;
  const prettyDate =
    post.date &&
    DateTime.fromJSDate(post.date).toLocaleString(DateTime.DATE_MED);

  function renderTwitter({twitter}) {
    return html`
      <li class="w-author__link-listitem">
        <a href="https://twitter.com/${twitter}">Twitter</a>
      </li>
    `;
  }

  function renderGitHub({github}) {
    return html`
      <li class="w-author__link-listitem">
        <a href="https://github.com/{${github}">GitHub</a>
      </li>
    `;
  }

  function renderGlitch({glitch}) {
    return html`
      <li class="w-author__link-listitem">
        <a href="https://glitch.com/@${glitch}">Glitch</a>
      </li>
    `;
  }

  function renderSocialMedia(author) {
    return html`
      <ul class="w-author__link-list">
        ${author.twitter && renderTwitter(author)}
        ${author.github && renderGitHub(author)}
        ${author.glitch && renderGlitch(author)}
      </ul>
    `;
  }

  return html`
    <div class="w-author__info">
      <cite class="w-author__name">${fullName}</cite>
      ${showSocialMedia && renderSocialMedia(author)}
      ${prettyDate && `<time class="w-author__published">${prettyDate}</time>`}
    </div>
  `;
};
