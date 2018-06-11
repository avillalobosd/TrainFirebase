
var  nextTrain;
var nextTrainTime;
var config = {
    apiKey: "AIzaSyBOvL-WeYU1553U8Rv-9xZmjwMkz85KX4o",
    authDomain: "traincbc-474ec.firebaseapp.com",
    databaseURL: "https://traincbc-474ec.firebaseio.com",
    projectId: "traincbc-474ec",
    storageBucket: "traincbc-474ec.appspot.com",
    messagingSenderId: "641507904869"
};
firebase.initializeApp(config);
var database = firebase.database();


$(".enviar").on("click", function () {
    var nombre = $(".name").val();
    var destination = $(".destination").val();
    var first = $(".first").val();
    var frequency = $(".frequency").val();
    console.log(nombre);
    console.log(destination);
    console.log(first);
    console.log(frequency);
    $(".name").val("");
    $(".destination").val("");
    $(".first").val("");
    $(".frequency").val("");


    firebase.database().ref().push({
        nombre: nombre,
        destination:destination,
        first: first,
        frequency: frequency


    });



});



database.ref().on("child_added", function(childSnapshot) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var nombre = childSnapshot.val().nombre;
    var destination = childSnapshot.val().destination;
    var first = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;
    var firstTime = first;
    var tFrequency = frequency;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");



    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

 
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);


    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrainTime="ARRIVAL TIME: " + moment(nextTrain).format("hh:mm");
    console.log(nextTrain); 
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrainTime="ARRIVAL TIME: " + moment(nextTrain).format("hh:mm");


    $(".tabla").append("<tr><td>"+nombre+"</td><td>"+destination+"</td><td>"+first+"</td><td>"+frequency+"</td><td>"+nextTrainTime+"</td></tr>");
    
  
    // var i= '<div class="col s12 m6 l3"> <div style="height:300px; width:300px;"class="card medium"> <div class="card-image waves-effect waves-block waves-light"> <img style="heigth:300px, width:300px;"class="activator" src="'+fotoperro+'"> </div><div class="card-content"> <span class="card-title activator grey-text text-darken-4">'+nombreperro+ '<i class="material-icons right">more_vert</i> </span> </div> <div class="card-reveal"> <span class="card-title grey-text text-darken-4">'+nombreperro+'<i class="material-icons right">close</i> </span> <p> Dueño: '+owner+'</p><p> Celular: '+celular+'<a href="https://api.whatsapp.com/send?phone=52'+celular+'&text=hola,%20quisiera%20información%20del%20perrito,%20'+nombreperro+'%20que%20estás%20dando%20en%20adopcion?"> <img style="width:40px; height:40px;"border="0" alt="Enviar Whatsapp" src="assets/images/whatsapp.png" width="100" height="100"></a></p><p> Email: '+email+'</p><p> Raza: '+raza+'</p><p>'+descripcion+'</p> </div> </div> </div>'

    // $("#fotos").append(i);

  });