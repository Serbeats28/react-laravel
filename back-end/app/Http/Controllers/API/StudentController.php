<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudentModel;

class StudentController extends Controller
{
    function create(Request $request){
        $email = $request->input('email');
        $studentModel = new StudentModel();
        $data1 = $studentModel->where('email',$email)->count();
        
        if($data1 > 0){
            return response()->json([
                'status'=>'error',
                'message'=>'Student Email is already is exist'
            ]);
        }else{
            $file = $request->file('avatar');
            $filename = time(). '.' .$file->getClientOriginalExtension();
            $file->move('image/', $filename); 
            $default_value = "2023";
            $student_number = $default_value.rand(999999,000000);
            $data = [
                'student_number'=>$student_number,
                'email'=>$request->input('email'),
                'first_name'=>$request->input('first_name'),
                'last_name'=>$request->input('last_name'),
                'contact_number'=>$request->input('contact_number'),
                'avatar'=>$filename
         ];
            $studentModel::create($data);
            return response()->json([
                'status'=>'success',
                'message'=>'Added Successfully'
            ]);
        }
       
    }

    function read(Request $request){
        $data = StudentModel::all();
        return response()->json([
            'user'=>$data
        ]);
        
    }

    function retrieve($id){
        $data = StudentModel::find($id);
        return response()->json([
            'status'=>'success',
            'student'=>$data
        ]);
    }

    function update(Request $request){
       $id = $request->input('id');
       $student = StudentModel::find($id);
     
       $path = public_path('image/'.$student->avatar);
       if(file_exists($path)){
          unlink($path);
       }

       //$studentModel = new StudentModel();
       $file = $request->file('avatar');
       $filename =time(). '.' .$file->getClientOriginalName();
       $file->move('image/',$filename);

       $data=[
        'student_number'=>$request->input('student_number'),
        'email'=>$request->input('email'),
        'first_name'=>$request->input('first_name'),
        'last_name'=>$request->input('last_name'),
        'contact_number'=>$request->input('contact_number'),
        'avatar'=>$filename,
       ];

       $student->update($data);
       return response()->json([
        'status'=>'success',
        'message'=>'Update Successfully'
       ]);
    }

    function delete($id){
       $student =  StudentModel::find($id);
       $path = public_path('image/'.$student->avatar);
       if(file_exists($path)){
         unlink($path);
       }

       StudentModel::find($id)->delete();
       return response()->json([
        'status'=>'success',
        'message'=>'Deleted Successfully'
    ]);
    }
}
