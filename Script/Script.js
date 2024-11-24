
// Load All Data.
const LoadAllPost = async (isRead) => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    const posts = data.posts;
    if (!isRead) {
        displayPosts(posts, data.message);
    }
    return (posts);
};
LoadAllPost();


// Display Data Function.
const displayPosts = async (data, message) => {
    const loading = document.getElementById("loading");

    // Show Post Container.
    const postContainer = document.getElementById("posts-container");
    postContainer.textContent = "";
    postContainer.classList.remove("hidden");

    if (message === "successfully fetched the posts") {
        data.forEach(post => {
            const div = document.createElement("div");
            div.innerHTML = `
        <div class="flex flex-col lg:flex-row items-center lg:items-start bg-[#797DFC1A] border border-[#797DFC] rounded-2xl p-8 gap-6">
            <div>
                <div class="${post?.isActive ? 'bg-[#10B981] w-7 md:w-4 h-7 md:h-4 rounded-full relative -right-28 md:-right-[70px] -bottom-4 md:-bottom-2 border-2 border-white' : 'bg-[#FF3434] w-7 md:w-4 h-7 md:h-4 rounded-full relative -right-28 md:-right-[70px] -bottom-4 md:-bottom-2 border-2 border-white'}"></div>
                <div class="rounded-xl w-32 md:w-20">
                    <img class="rounded-xl w-32 md:w-20" src="${post.image}" alt="">
                </div>
            </div>
            <div class="space-y-6 w-full lg:flex-1 text-center lg:text-start">
                    <span class="text-sm font-medium text-[#12132DCC] font-inter"># ${post.category}</span>
                    <span class="text-sm font-medium text-[#12132DCC] font-inter ml-4">Author: ${post.author?.name}</span>
                    <h1 class="text-[#12132D] text-xl font-bold">${post.title}</h1>
                    <p class="text-base font-normal font-inter text-[#12132D99] border-b border-dashed border-b-[#12132D40] pb-4">
                    ${post.description}
                    </p>
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-2 lg:space-x-10">
                        <div class="flex gap-2 lg:gap-4">
                            <img src="images/comment.svg" alt="">
                            <span>${post.comment_count}</span>
                        </div>
                        <div class="flex gap-2 lg:gap-4">
                            <img src="images/view.svg" alt="">
                            <span>${post.view_count}</span>
                        </div>
                        <div class="flex gap-2 lg:gap-4">
                            <img src="images/time.svg" alt="">
                            <span>${post.posted_time}</span>
                        </div>
                    </div>
                    <button onclick="MarkAsRead(${post.id})">
                        <img src="images/markasread.svg" alt="">
                    </button>
                </div>
            </div>
        </div>
        `
            // console.log(post);
            postContainer.appendChild(div);
        });
    } else {
        const p = document.createElement("p");
        p.innerText = "No Posts Found!!";
        postContainer.appendChild(p);
    }

    loading.classList.add("hidden");
};


// Mark As Read Count And Add Function.
const MarkAsRead = async (id) => {
    const data = await LoadAllPost(true);
    const MarkAsReadContainer = document.getElementById("markAsRead-container");
    const div = document.createElement("div");
    data.forEach(p => {
        if (p.id === id) {
            div.innerHTML = `
            <div class="bg-white px-6 py-4 rounded-xl flex justify-between items-center">
                <h1 class="font-semibold text-base text-[#12132D]">${p.title}</h1>
                <div class="flex gap-2">
                    <img src="images/view.svg" alt="">
                    <span class="font-normal font-inter text-base text-[#12132D99]">${p.view_count}</span>
                </div>
            </div>
            `;
            MarkAsReadContainer.appendChild(div);
        }
    });
    const readCount = document.getElementById("read-count");
    const readInt = parseInt(readCount.innerText)
    readCount.innerText = readInt + 1;
};


// Load Latest Post Function.
const LoadLatestPost = async () => {
    const LatestPostContainer = document.getElementById("latest-post-container");
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();

    data.forEach(post => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card bg-base-100 w-full border border-gray-300">
            <figure class="px-8 pt-8">
                <img src="${post.cover_image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body space-y-2">
                <div class="flex items-center gap-2">
                    <img src="images/publish.svg" alt="">
                    <p class="font-normal text-base text-[#12132D99]">${post.author?.posted_date || "No publish date"}</p>
                </div>
                <h1 class="card-title font-extrabold text-lg text-[#12132D]">${post.title}</h2>
                <p class="font-normal text-base text-[#12132D99]">${post.description}</p>
                <div class="card-actions">
                    <div class="">
                        <img class="w-12 h-12 rounded-full" src="${post.profile_image}" alt="">
                    </div>
                    <div>
                        <h4 class="font-bold text-[#12132D]">${post?.author?.name}</h4>
                        <p class="font-normal text-[#12132D99] text-sm">${post?.author?.designation || "Unknown"}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        LatestPostContainer.appendChild(div)
    });
};
LoadLatestPost();


// Load Post By Search Requirement.
const SearchPostData = async () => {
    const SearchInput = document.getElementById("search-input");
    const SearchText = SearchInput.value;

    // Show Loading Spinner.
    const loading = document.getElementById("loading");
    loading.classList.remove("hidden");

    // Hide Posts Container.
    const postContainer = document.getElementById("posts-container");
    postContainer.classList.add("hidden");

    // Fetch Search Posts Data.
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${SearchText}`);
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts, data.message);
    console.log(data)
}