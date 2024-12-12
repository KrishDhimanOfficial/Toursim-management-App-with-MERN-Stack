import {
    server_url, FormLoader, Formbtn, ErrorAlert, previewMultipleImage, previewImg,
    ResetForm, dataID, Input_img, displayPreviewImage, multipleImagesInput,
    openModalToDeleteRequest, sendDataToServer, createSlug, displayPreviewImages,
    createTags, clearInputFiles, updateDataStatus
} from './variable.js'

const tour_location_table = document.querySelector('#tour-location-table')
const tour_category_table = document.querySelector('#tour-category-table')
const post_category_table = document.querySelector('#post-category-table')
const post_comment_table = document.querySelector('#post-comment-table')
const posts_table = document.querySelector('#post-table')
const tours_table = document.querySelector('#tour_table')
const description = document.querySelectorAll('.ql-editor')[0]
const travellingPlan = document.querySelectorAll('.ql-editor')[1]
const tour_included = document.querySelector('#included')
const tour_excluded = document.querySelector('#excluded')
const createIncludedTag = document.querySelector('.createIncludedTag')
const createExcludedTag = document.querySelector('.createExcludedTag')
const tagscontainer = document.querySelector('.tourTags')
const tourInculdedContainer = document.querySelector('#tourIncludedTags')
const tourExculdedContainer = document.querySelector('#tourExcludedTags')
const pCategorySlug = document.querySelector('#slug')
const status = document.querySelector('#status')

//  preview image on screen
if (Input_img) Input_img.onchange = (e) => { displayPreviewImage(e) }
//  preview images on screen
if (multipleImagesInput) multipleImagesInput.onchange = (e) => { displayPreviewImages(e) }

// Clear Multiple Input Files
if (Formbtn?.id === 'submitForm' && previewMultipleImage) {
    previewMultipleImage.onclick = (e) => clearInputFiles(e)
}

// Inject Tour Included Tags 
if (tour_included) createIncludedTag.onclick = () => {
    if (tour_included.value) {
        includedTagsArray.push(tour_included.value.trim())
        const tag = createTags(tour_included.value.trim())
        tourInculdedContainer.insertAdjacentHTML('afterbegin', tag)
        tour_included.value = '';
    }
}
// Inject Tour Excluded Tags 
if (tour_excluded) createExcludedTag.onclick = () => {
    if (tour_excluded.value) {
        excludedTagsArray.push(tour_excluded.value.trim())
        const tag = createTags(tour_excluded.value.trim())
        tourExculdedContainer.insertAdjacentHTML('afterbegin', tag)
        tour_excluded.value = '';
    }
}
// openModal Tour Tags
if (tagscontainer) tagscontainer.onclick = (e) => {
    const tag = e.target.closest('.openModalTag')?.innerText.trim();
    includedTagsArray = includedTagsArray.filter(currentTag => currentTag != tag)
    excludedTagsArray = excludedTagsArray.filter(currentTag => currentTag != tag)
    if (e.target.closest('.openModalTag')) e.target.closest('.openModalTag').remove()
}

// It's reset the Form State
if (ResetForm) ResetForm.onclick = () => {
    FormLoader.style.display = 'none';
    dataID.value = '';
    ErrorAlert.style.display = 'none';
    previewImg.style.display = 'block';
    previewImg.src = '/assets/images/upload_area.png';
    previewImg.classList.remove('d-none')
    if (description) description.innerHTML = '';
    if (EndURL == 'api/tour') {
        travellingPlan.innerHTML = '';
        previewMultipleImage.innerHTML = '';
        document.querySelector('#featured_image').src = '/assets/images/upload_area.png';
    }
}

// Handle Form POST and PUT Operation
if (Formbtn) Formbtn.onsubmit = async (e) => {
    e.preventDefault()

    const method = Formbtn.id === 'submitForm' ? 'POST' : 'PUT';
    const url = Formbtn.id === 'submitForm' ? `${server_url}/${EndURL}` : `${server_url}/${EndURL}/${dataID.value}`;
    const formData = new FormData(e.target)

    if (EndURL === 'api/posts/category') {     // post category
        formData.append('slug', createSlug(`${pCategorySlug.value}`))
        formData.append('status', status.checked)
    }
    if (EndURL === 'api/post') {  // Create Post
        formData.append('post_slug', createSlug(`${slug.value}`))
        formData.append('description', description.getHTML())
        formData.append('status', status.checked)
    }
    if (EndURL === 'api/tour') {  // Create Tour
        formData.append('product_excluded', excludedTagsArray)
        formData.append('product_included', includedTagsArray)
        formData.append('slug', createSlug(`${slug.value}`))
        formData.append('description', description.getHTML())
        formData.append('travelling_plan', travellingPlan.getHTML())
        formData.append('status', status.checked)
    }
    if (EndURL === 'api/tour/category') { // Create Tour category
        formData.append('status', status.checked)
    }
    if (EndURL === 'api/tour/location') { // Create Tour location
        formData.append('status', status.checked)
    }

    const response = await sendDataToServer(url, method, formData)
    if (response && Formbtn.id === 'updateFormData') window.location.reload()
}

// Inject EventListener
if (tour_location_table) tour_location_table.onclick = async (e) => {
    if (e.target.closest('.openModal')) {
        openModalToDeleteRequest(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
    if (e.target.closest('.status')) {
        updateDataStatus(e.target.checked, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}

// Inject EventListener
if (tour_category_table) tour_category_table.onclick = async (e) => {
    if (e.target.closest('.openModal')) {
        openModalToDeleteRequest(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
    if (e.target.closest('.status')) {
        updateDataStatus(e.target.checked, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}

// Inject EventListener
if (post_category_table) post_category_table.onclick = async (e) => {
    if (e.target.closest('.openModal')) {
        openModalToDeleteRequest(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
    if (e.target.closest('.status')) {
        updateDataStatus(e.target.checked, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}

// Inject EventListener
if (posts_table) posts_table.onclick = async (e) => {
    if (e.target.closest('.openModal')) {
        openModalToDeleteRequest(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
    if (e.target.closest('.status')) {
        updateDataStatus(e.target.checked, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}

// Inject EventListener
if (post_comment_table) post_comment_table.onclick = async (e) => {
    if (e.target.closest('.openModal')) {
        openModalToDeleteRequest(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
    if (e.target.closest('.status')) {
        updateDataStatus(e.target.checked, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}

// Inject EventListener
if (tours_table) tours_table.onclick = async (e) => {
    if (e.target.closest('.openModal')) {
        openModalToDeleteRequest(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
    if (e.target.closest('.status')) {
        updateDataStatus(e.target.checked, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}

// Set Admin Details
const role = document.querySelector('#profile span')
const Name = document.querySelector('#profile h6')
const adminName = document.querySelector('#adminName')
const copyright = document.querySelector('.copyright')
const companyName = document.querySelector('#companyName')
const companylogo = document.querySelector('#companylogo')

    ; (async () => {
        const api = await fetch(`${server_url}/get/admin/details`, { method: 'GET' })
        const response = await api.json()
        role.innerHTML = response.admin.role
        Name.innerHTML = response.admin.name
        adminName.innerHTML = response.admin.name
        companyName.innerHTML = response.general_setting.company_name
        copyright.innerHTML = response.general_setting.company_copyright
        companylogo.src = `${response.logo_img_url}/${response.general_setting.logo}`
    }
    )() //IIFE


// update comment status
const commentselectBox = document.querySelector('#status')
const CommentStatusbtn = document.querySelector('#updateStatus')
const id = document.querySelector('#commentId')

if (CommentStatusbtn) CommentStatusbtn.onclick = async () => {
    const api = await fetch(`${server_url}/${EndURL}/${id.value.trim()}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: commentselectBox.value.trim() })
    })
    const res = await api.json()
    if (res.message) {
        ErrorAlert.style.display = 'block';
        ErrorAlert.innerHTML = 'update successfully!'
    } else {
        ErrorAlert.style.display = 'block';
        ErrorAlert.innerHTML = 'Unable to update!'
    }
    setTimeout(() => ErrorAlert.style.display = 'none', 2000)
}