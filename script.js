const itemForm=document.getElementById('item-form');
const itemList=document.getElementById('item-list');
const itemInput=document.getElementById('item-input');
const filterbox=document.getElementById('filter')
const itemlistClear=document.getElementById('clear')
const updateBtn=itemForm.querySelector('button')
let edit=false
const displayItems=()=>{
    const itemsFromStorage=getFromLocalStorage();
    itemsFromStorage.forEach((item)=>addItemToDOM(item))
    checkUI()
}

const addItem=(e)=>{
    e.preventDefault();
    const itemInputValue=itemInput.value
    if(itemInputValue===''){
        alert('write something')
        return;
    }   

    if(edit){
        const itemToEdit=itemList.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove();
        edit=false
    } else {
        if (checkIfItemExists(itemInputValue)) {
          alert('That item already exists!');
          return;
        }
      }
    addItemToDOM(itemInputValue)

    addItemToLocalStorage(itemInputValue)

    checkUI()

    itemInput.value=''
}

const getFromLocalStorage=()=>{
    let locallyStoredItem;
    if(localStorage.getItem('items')===null){
        locallyStoredItem=[]
    }
    else{
        locallyStoredItem=JSON.parse(localStorage.getItem('items'))
    }
    return locallyStoredItem;
}

const addItemToDOM=(item)=>{
    const li=document.createElement('li')
    li.appendChild(document.createTextNode(item))
    const btn=document.createElement('button')
    btn.className='remove-item btn-link text-red'
    const icon=document.createElement('i')
    icon.className='fa-solid fa-xmark text-red'
    li.appendChild(btn)
    li.appendChild(icon)
    itemList.appendChild(li)
}

const addItemToLocalStorage=(item)=>{
    const locallyStoredItem=getFromLocalStorage();
    locallyStoredItem.push(item)
    localStorage.setItem('items',JSON.stringify(locallyStoredItem))
}


const onClickItem=(e)=>{
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target)
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getFromLocalStorage();
    return itemsFromStorage.includes(item);
  }
  


function setItemToEdit(item){
    edit=true
    itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'))
    item.classList.add('edit-mode')
    updateBtn.innerHTML='<i class="fa-solid fa-pen"></i>  Update Item'
    updateBtn.style.backgroundColor='#228B22'
    itemInput.value=item.textContent

}


function removeItemFromStorage(item){
    let itemsfromStorage=getFromLocalStorage();
    itemsfromStorage=itemsfromStorage.filter((num)=>num!==item)
    localStorage.setItem('items',JSON.stringify(itemsfromStorage))
}

const removeItem=(item)=>{
    if(confirm('Are you sure')){
        item.remove()
    removeItemFromStorage(item.textContent);
    checkUI()
    }
}

const clearListItem=()=>{
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }

    localStorage.removeItem('items')
    checkUI()
}

function checkUI(){
    itemInput.value=''
    const items=itemList.querySelectorAll('li')
    if(items.length===0){
        itemlistClear.style.display='none'
        filterbox.style.display='none'
    }
    else{
        itemlistClear.style.display='block'
        filterbox.style.display='block'
    }
    
    updateBtn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item'
    updateBtn.style.backgroundColor='#333'
    edit=false

}

const filterItems=(e)=>{
    const items=itemList.querySelectorAll('li')
    const findText=e.target.value.toLowerCase()

    items.forEach((item)=>{
        const itemName=item.firstChild.textContent.toLowerCase()
        if(itemName.indexOf(findText)!=-1){
            item.style.display='flex'
        }
        else{
            item.style.display='none'
        }
    })  

}
function init(){
    itemForm.addEventListener('submit',addItem)
    itemList.addEventListener('click',onClickItem)
    itemlistClear.addEventListener('click',clearListItem)
    filterbox.addEventListener('input',filterItems)
    document.addEventListener('DOMContentLoaded',displayItems)
    checkUI()
}
init()

