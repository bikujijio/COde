"use strict";
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const deleteBtn = document.getElementById("delete");
// lấy dữ liệu nhập vào từ form
function getData() {
  const data = {
    id: idInput.value,
    age: parseInt(ageInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    date: new Date(),
    name: nameInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };

  return data;
}
function isIdExist(id) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === id) {
      return true;
    } else {
      return false;
    }
  }
}
//validate form
function validateData(data) {
  if (isIdExist(data.id) || data.id === "") {
    console.log("ID must be unique!");
  } else if (data.age < 1 || data.age > 15) {
    console.log("Age must be between 1 and 15!");
  } else if (data.weight < 1 || data.weight > 15) {
    console.log("Weight must be between 1 and 15!");
  } else if (data.length < 1 || data.length > 100) {
    console.log("Length must be between 1 and 100!");
  } else if (data.type === "") {
    console.log("Please select Type!");
  } else if (data.breed === "") {
    console.log("Please select Breed!");
  } else {
    return true;
  }
}
const clearInput = () => {
  idInput.value = "";
  typeInput.value = "Select type";
  vaccinatedInput.checked = false;
  ageInput.value = NaN;
  breedInput.value = "Select Breed";
  colorInput.value = "#fff";
  dewormedInput.checked = false;
  lengthInput.value = "";
  nameInput.value = "";
  sterilizedInput.checked = false;
  typeInput.value = "Select Type";
};
//bắt sự kiện vào nút submit
const petArr = [];
function renderTableData(data) {
  let ouputTable = document.getElementById("tbody");
  const petList = `
  <tr>
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.age}</td>
    <td>${data.type}</td>
    <td>${data.weight} kg</td>
    <td>${data.length} cm</td>
    <td>${data.breed}</td>
    <td><i class="bi bi-square-fill" style="color: ${data.color};"></i></td>
    <td><i class="bi bi-check-circle-fill" style ="color : ${
      data.vaccinated === true ? "green" : "red"
    }"></i></td>
		<td><i class="bi bi-check-circle-fill" style ="color : ${
      data.dewormed === true ? "green" : "red"
    }"></i></td>
		<td><i class="bi bi-check-circle-fill" style ="color : ${
      data.sterilized === true ? "green" : "red"
    }"></i></td>
    <td>${data.date}</td>
    <td><button class="btn btn-danger" data-id = "${
      data.id
    }" id= "delete" >Delete</button></td>
  </tr>
`;

  ouputTable.insertAdjacentHTML("beforeend", petList);
  document.querySelector("form").reset();
  // add event listener for delete button
  const deleteButton = document.getElementById("delete");
  if (deleteButton) {
    deleteButton.addEventListener("click", function (event) {
      const tr = event.target.closest("tr");
      if (confirm("Are you sure?")) {
        tr.remove();
      }
    });
  } else {
    console.log("no");
  }
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const data = getData();
  const validate = validateData(data);
  console.log(validate);
  if (validate === true) {
    petArr.push(data);
    clearInput();
    renderTableData(data);
  }
});
//Hiển thị các thú cưng khỏe mạnh

let healthyCheck = false;
const healthyPetArr = [];

healthyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!healthyCheck) {
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
    // const healPet = Array.from(petArr).filter((pet) => {
    //   const healthStatus = pet.querySelector('td:nth-child(9), td:nth-child(10), td:nth-child(11)').style.color;
    //   console.log(healthStatus)
    //   return healthStatus === "green";      
    // });
    const healPet = Array.from(petArr).filter((pet) => {
      const tdList = document.querySelector('td:nth-child(9), td:nth-child(10), td:nth-child(11)');
      const healthStatus = Array.from(tdList).every(td => td.style.color === 'green');
      console.log(healthStatus)
      return healthStatus;
    });
    
console.log(healPet)

      healthyPetArr.push(healPet);
      
      clearInput();
      const petObj = {};
      healthyPetArr.map((pet) => {
        petObj[pet.name] = {
          id: pet.id,
          age: pet.age,
          color: pet.color,
          breed: pet.breed,
          vaccinated: pet.vaccinated,
          date: pet.date,
          name: pet.name,
          type: pet.type,
          weight: pet.weight,
          length: pet.length,
          dewormed: pet.dewormed,
          sterilized: pet.sterilized,
        };
      });
      renderTableData(petObj);

  } else {
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
    petArr.push(data);
    clearInput();
    const obj = 
    renderTableData(data);
  }
});

// healthyBtn.addEventListener('click', (e) => {
// const pet = [];
// let healthyCheck = false;
//   const petList = document.querySelectorAll('#tbody tr');
//   if (!healthyCheck) {
//     const healthyPetList = Array.from(petList).filter((pet) => {
//       const healthStatus = pet.querySelector('td:nth-child(8) i').style.color;

//       return healthStatus === 'green';
//     });
//      console.log(healthyPetList)
//     // Cập nhật lại bảng hiển thị với danh sách thú cưng khỏe mạnh
//     const outputTable = document.getElementById('tbody');
//     outputTable.innerHTML = '';
//     healthyPetList.forEach((pet) => {
//       outputTable.appendChild(pet);

//     });
//     // Đổi nút bấm thành "Show All Pet" và cập nhật biến showOnlyHealthy
//     healthyBtn.textContent = 'Show All Pet';
//     healthyCheck = true;

//     renderTableData(pet)

//   } else {
//     // Cập nhật lại bảng hiển thị với toàn bộ danh sách thú cưng
//     const outputTable = document.getElementById('tbody');
//     outputTable.innerHTML = '';
//     petList.forEach((pet) => {
//       outputTable.appendChild(pet);
//     });
//     // Đổi nút bấm thành "Show Healthy Pet" và cập nhật biến showOnlyHealthy
//     healthyBtn.textContent = 'Show Healthy Pet';
//     healthyCheck = false;
//     const data = getData();
//   const validate = validateData(data);
//    console.log(validate);
//    if (validate === true) {
//     petArr.push(data);
//     //clearInput();
//     renderTableData(data);
//    }
//   }

// });
