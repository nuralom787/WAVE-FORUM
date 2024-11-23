
// Load All Data.
const LoadAllPost = async (isRead) => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    const posts = data.posts;
    if (!isRead) {
        displayPosts(posts);
    }
    return (posts);
};
LoadAllPost();


// Display Data Function.
const displayPosts = async (data) => {
    const postContainer = document.getElementById("posts-container");
    data.forEach(post => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex items-start bg-[#797DFC1A] border border-[#797DFC] rounded-2xl p-8 gap-6">
            <div>
                <div class="${post?.isActive ? 'bg-[#10B981] w-4 h-4 rounded-full relative -right-[70px] -bottom-2 border-2 border-white' : 'bg-[#FF3434] w-4 h-4 rounded-full relative -right-[70px] -bottom-2 border-2 border-white'}"></div>
                <img class="rounded-xl w-20" src="${post.image}" alt="">
            </div>
            <div class="space-y-6 flex-auto">
                    <span class="text-sm font-medium text-[#12132DCC] font-inter"># ${post.category}</span>
                    <span class="text-sm font-medium text-[#12132DCC] font-inter ml-4">Author: ${post.author?.name}</span>
                    <h1 class="text-[#12132D] text-xl font-bold">${post.title}</h1>
                    <p class="text-base font-normal font-inter text-[#12132D99] border-b border-dashed border-b-[#12132D40] pb-4">
                    ${post.description}
                    </p>
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-10">
                        <div class="flex gap-4">
                            <img src="images/comment.svg" alt="">
                            <span>${post.comment_count}</span>
                        </div>
                        <div class="flex gap-4">
                            <img src="images/view.svg" alt="">
                            <span>${post.view_count}</span>
                        </div>
                        <div class="flex gap-4">
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
    })
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