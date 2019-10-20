'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked! ;)');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('href:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle:', targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optTagsSelector = '.post-tags .list a';
const optSidebarTagsSelector = '.sidebar-tags .list a';
const optArticleAuthorSelector = '.post-author';
const optAuthorSelector = '.post-author a';
const optTagsListSelector = '.tags.list';
const optAuthorsListSelector = '.authors.list';
const optSidebarAuthorsSelector = '.sidebar-authors .list a';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){
  console.log('generate:', generateTitleLinks)

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable:articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  /* for each article */
  for(let article of articles){
    console.log('for each:', article);

  /* get the article id */ /*get atrribute ale z czego?? */
    const articleId = article.getAttribute('id');
    console.log('id:', articleId);

  /* find the title element and get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

  /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
``
  /* insert link into html variable */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


function calculateTagsParams(tags){

  const params = {
    max: 0,
    min: 999999,
  };
  console.log('params:', params);

  for(let tag in tags){

    if(tags[tag] > params.max){
      params.max = tags[tag];
    } else if(tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }

  return params;
}

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return classNumber;

}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('generate tags:', articles);

  /* START LOOP: for every article: */
  for(let article of articles){
    console.log('for each:', article);

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('data-tags:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log('tag:', tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags */
  for (let tag in allTags){
    console.log('object tag:', tag);
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" ' + 'class="' + optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>' ;
    console.log('tagLinkHTML:' + tagLinkHTML);
    allTagsHTML += tagLinkHTML;

  /* [NEW] END LOOP: for each tag in allTags */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}

// '<li><a href="#tag-' + tag + '"' + 'class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a>' + ' (' + allTags[tag] + ')</li>' ;

generateTags();



function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('tag was clicked', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href:', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    console.log('activeTag:', activeTag);

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){

    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* find all links to tags */
  const linksToTags = document.querySelectorAll(optTagsSelector);
  console.log('links to tags:', linksToTags);

  /* START LOOP: for each link */
  for (let linkToTag of linksToTags){
    console.log('for each:', linkToTag);

    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();


function addClickListenersToSidebarTags(){

  /* find all links to tags */
  const linksToTags = document.querySelectorAll(optSidebarTagsSelector);
  console.log('links to tags:', linksToTags);

  /* START LOOP: for each link */
  for (let linkToTag of linksToTags){
    console.log('for each:', linkToTag);

    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToSidebarTags();


function generateAuthors(){

  /* [NEW] create a new variable allTags with an empty object */
   let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('authors:', articles);

  /* START LOOP: for every article: */
  for(let article of articles){
  console.log('for each:', article);

    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log('authorWrapper:', authorWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('data-author:', articleAuthor);

    /* generate HTML for the author */
    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    console.log('linkHTML:', linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allTags */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* insert author name into the author wrapper */
    authorWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all links HTML code */

  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors */
  for (let author in allAuthors){
    console.log('author:', author);
    /* [NEW] generate code of a link and add it to allAuthorssHTML */
    const authorLinkHTML = '<li><a href="#author-' + author + '">' + author +'</a> (' + allAuthors[author] + ')</li>' ;
    console.log('authorLinkHTML:', authorLinkHTML);
    allAuthorsHTML += authorLinkHTML;

  /* [NEW] END LOOP: for each author in allAuthors */
  }
  /* [NEW] add html from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;

}

generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('author was clicked', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href:', href);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for(let activeAuthor of activeAuthors){
    console.log('activeAuthor:', activeAuthor);

    /* remove class active */
    activeAuthor.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let authorLink of authorLinks){

    /* add class active */
    authorLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){

  /* find all links to authors */
  const linksToAuthor = document.querySelectorAll(optAuthorSelector);
  console.log('links to authors:', linksToAuthor);

  /* START LOOP: for each author */
  for (let linkToAuthor of linksToAuthor){
    console.log('for each author:', linkToAuthor);

    /* add tagClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();


function addClickListenersToSidebarAuthors(){

  /* find all links to authors */
  const linksToAuthor = document.querySelectorAll(optSidebarAuthorsSelector);
  console.log('links to Author:', linksToAuthor);

  /* START LOOP: for each link */
  for (let linkToAuthor of linksToAuthor){
    console.log('for each author:', linkToAuthor);

    /* add tagClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToSidebarAuthors();




