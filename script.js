const searchForm = document.getElementById('search')
const searchBox = document.getElementById('search-box')
const searchResult = document.getElementById('search-result')
const showMore = document.getElementById('show-more')

// Access key = K6TQGKM7dJi4nGHB3GldeJlTfh6UTs6eDW953pFyiLM
// Secret key = paOkC4DYyFVVk3mrkdwiN70JSN0ZochVJRI8VxamroM
// AID = 654348

// Actual url = https://api.unsplash.com/search/photos?page=1&query=office&client_id=K6TQGKM7dJi4nGHB3GldeJlTfh6UTs6eDW953pFyiLM

// https://api.unsplash.com/search/photos?page=1&query=office&cliend_id=K6TQGKM7dJi4nGHB3GldeJlTfh6UTs6eDW953pFyiLM
const accesskey = 'K6TQGKM7dJi4nGHB3GldeJlTfh6UTs6eDW953pFyiLM'

let keyword = "";
let page = 1;

async function searchImg() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`

    const response =  await fetch(url)
    const data = await response.json();

    if (page == 1) {
        searchResult.innerHTML = '';
    }

    // console.log(data)

    const results = data.results;

    results.map((result) => {
        const img = document.createElement("img");
        img.src = result.urls.small;
        img.style.height = '230px';
        img.style.width = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '10px';

        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank"

        imgLink.appendChild(img);
        searchResult.appendChild(imgLink);
        searchResult.style.width = '80%';
        searchResult.style.margin = '100px auto 50px';
        searchResult.style.display = 'grid';
        searchResult.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
        searchResult.style.gridGap = '20px';
    })

    showMore.style.display = 'block'
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1
    searchImg()
})

showMore.addEventListener('click', () => {
    page++;
    searchImg();
})