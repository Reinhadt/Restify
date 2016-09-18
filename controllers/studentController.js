//This Controller deals with all functionalities of Student

function studentController () {
	var Student = require('../models/studentSchema');

	// Creating New Student
	this.createStudent = function (req, res, next) {
		/*var student = new Student({
			name:req.body.name,
			email:req.body.email,
			age:req.body.age,
			city:req.body.city,
			pic:req.body.pic
		});*/

		console.log('DATOS:' + req.body.data.name);
		var student = new Student(req.body.data);


		student.save(function(err, result){
			if (err) {
				console.log('resultado: ' + result);
				console.log(err);
				return res.send({'errores':err});
			}
			else {
				return res.send({'result':result,'status':'successfully saved'});
			}
		});
		/*Student.create(info, function(err, result) {
			if (err) {
				console.log('resultado: ' + req.body.name);
				console.log(err);
				return res.send({'errores':err});
			}
			else {
        return res.send({'result':result,'status':'successfully saved'});
      }
		});*/
	};

  // Fetching Details of Student
  this.getStudent = function (req, res, next) {

    Student.find({}, function(err, result) {
      if (err) {
        console.log(err);
        return res.send({'error':err});
      }
      else {
        return res.send({'studentDetails':result});
      }
    });
  };

  //Delete single student--->MARAVILLA DE LA CREACIÓN
  this.removeStudent = function(req, res, next){

  	var id = req.params.id;

  	Student.remove({_id:id}, function(err, result){
  		if (err){
  			console.log(err);
  			return res.send({'error':err});
  		}
  		else{

  			return res.send({'result':result, 'status':'successfully erased!'});

  		}
  	});


  };

  //Get single student
  this.getOneStudent = function(req, res, next){
  	var id = req.params.id;

    Student.find({_id:id}, function(err, result) {
      if (err) {
        console.log(err);
        return res.send({'error':err});
      }
      else {
        return res.send({result});
      }
    });
  };

  this.updateStudent = function(req, res, next){
    var name = req.params.name;
    var email = req.params.email;
    var age = req.params.age;
    var city = req.params.city;
    var pic = req.params.pic;

    var id = req.params.id;

    Student.findOneAndUpdate(id, {name:name,email:email,age:age,city:city,pic:pic}, {upsert:true}, function(err, result){
      if(err){
        console.log(err);
        return res.send({'error':err});
      }
      else{
        return res.send({'Updated Student':result})
      }
    });


  }

return this;

};

module.exports = new studentController();
