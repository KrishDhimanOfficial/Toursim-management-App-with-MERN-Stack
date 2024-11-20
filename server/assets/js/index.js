import {
    server_url, FormLoader, Formbtn, ErrorAlert, previewMultipleImage, previewImg, ResetForm, dataID,
    Input_img, displayPreviewImage, multipleImagesInput, deleteDataRequestToServer,
    sendDataToServer, createSlug, displayPreviewImages, createTags, clearInputFiles
} from './variable.js'

const tour_location_table = document.querySelector('#tour-location-table')
const tour_category_table = document.querySelector('#tour-category-table')
const post_category_table = document.querySelector('#post-category-table')
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

//  preview image on screen
if (Input_img) Input_img.onchange = (e) => { displayPreviewImage(e) }
//  preview images on screen
if (multipleImagesInput) multipleImagesInput.onchange = (e) => {
    displayPreviewImages(e)
}
// Clear Multiple Input Files
if (Formbtn.id === 'submitForm') {
    previewMultipleImage.onclick = (e) => { clearInputFiles(e) }
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
// Delete Tour Tags
if (tagscontainer) tagscontainer.onclick = (e) => {
    const tag = e.target.closest('.deleteTag')?.innerText.trim();
    includedTagsArray = includedTagsArray.filter(currentTag => currentTag != tag)
    excludedTagsArray = excludedTagsArray.filter(currentTag => currentTag != tag)
    if (e.target.closest('.deleteTag')) e.target.closest('.deleteTag').remove()
}

// It's reset the Form State
if (ResetForm) ResetForm.onclick = () => {
    FormLoader.style.display = 'none';
    dataID.value = '';
    ErrorAlert.style.display = 'none';
    previewImg.style.display = 'block';
    previewImg.src = '/assets/images/upload_area.png';
    previewImg.classList.remove('d-none')
    if (description) description.innerHTML = ''; // This will clear the content of the editor
}

// Handle Form POST and PUT Operation
if (Formbtn) Formbtn.onsubmit = async (e) => {
    e.preventDefault()
    const method = Formbtn.id === 'submitForm' ? 'POST' : 'PUT';
    const url = Formbtn.id === 'submitForm' ? `${server_url}/${EndURL}` : `${server_url}/${EndURL}/${dataID.value}`;
    const formData = new FormData(e.target)

    // Create Post
    if (EndURL === 'api/post') {
        formData.append('post_slug', createSlug(`${slug.value}`))
        formData.append('description', description.getHTML())
    }
    // Create Tour
    if (EndURL === 'api/tour') {
        formData.append('product_excluded', excludedTagsArray)
        formData.append('product_included', includedTagsArray)
        formData.append('slug', createSlug(`${slug.value}`))
        formData.append('description', description.getHTML())
        formData.append('travelling_plan', travellingPlan.getHTML())
    }
    const response = await sendDataToServer(url, method, formData)
    if (response && Formbtn.id === 'updateFormData') { window.location.reload() }
}

// Inject EventListener
if (tour_location_table) tour_location_table.onclick = async (e) => {
    if (e.target.closest('.delete')) {
        deleteDataRequestToServer(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}

// Inject EventListener
if (tour_category_table) tour_category_table.onclick = async (e) => {
    if (e.target.closest('.delete')) {
        deleteDataRequestToServer(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}

// Inject EventListener
if (post_category_table) post_category_table.onclick = async (e) => {
    if (e.target.closest('.delete')) {
        deleteDataRequestToServer(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}


// Inject EventListener
if (posts_table) posts_table.onclick = async (e) => {
    if (e.target.closest('.delete')) {
        deleteDataRequestToServer(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}

// Inject EventListener
if (tours_table) tours_table.onclick = async (e) => {
    if (e.target.closest('.delete')) {
        deleteDataRequestToServer(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
}