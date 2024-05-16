const itemForm=document.getElementById('item-form');
const itemList=document.getElementById('item-list');
const itemInput=document.getElementById('item-input');

const addItem=(e)=>{
    e.preventDefault();
    if(itemInput.value===' '){
        alert('write something')
        return;
    }   
    const li=document.createElement('li')
    li.appendChild(document.createTextNode(itemInput.value))
    const btn=document.createElement('button')
    btn.className='remove-item btn-link text-red'
    li.appendChild(btn)
    const item=document.createElement('i')
    item.className='fa-solid fa-xmark text-red'
    li.appendChild(item)
    itemList.appendChild(li)
    itemInput.value=''
}
itemForm.addEventListener('submit',addItem)