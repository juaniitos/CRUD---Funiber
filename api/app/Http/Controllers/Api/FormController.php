<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FormController extends Controller
{

    public function index()
    {
        $forms = Form::all();
        return $forms;
    }

    public function store(Request $request)
    {
        try {
            $form = new Form();
            $form->area = $request->area;
            $form->program = $request->program;
            $form->names = $request->names;
            $form->last_names = $request->last_names;
            $form->email = $request->email;
            $form->phone = $request->phone;
            $form->country = $request->country;
            $form->state = $request->state;
            $form->city = $request->city;
            $form->comments = $request->comments;
            $form->privacy_policy = $request->privacy_policy;

            $form->save();

            // Enviar correo electrónico con los datos del formulario
            $this->sendEmail($form);

            return response()->json(['message' => 'Formulario almacenado con éxito'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al procesar la solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al procesar la solicitud'], 500);
        }
    }

    private function sendEmail($form)
    {
        try {
            $toEmail = 'juan@funiber.com'; // Cambiar a la dirección de correo a la que deseas enviar el formulario
            $subject = 'Nuevo formulario recibido';

            // Puedes personalizar el contenido del correo según tus necesidades
            $emailContent = "
                **Nuevo formulario recibido:**
                Gracias $form->names!
                Por enviar la información. En breve un asesor se comunicará contigo

                **Área:** $form->area
                **Programa:** $form->program
                **Nombres:** $form->names
                **Apellidos:** $form->last_names
                **Email:** $form->email
                **Teléfono:** $form->phone
                **País:** $form->country
                **Estado:** $form->state
                **Ciudad:** $form->city
                **Comentarios:** $form->comments

                Saludos,
                FUNIBER
            ";

            // Enviar el correo electrónico
            Mail::raw($emailContent, function ($message) use ($toEmail, $subject) {
                $message->to($toEmail)
                    ->subject($subject);
            });

            \Log::info('Correo electrónico enviado con éxito.');

        } catch (\Exception $e) {
            \Log::error('Error al enviar el correo electrónico: ' . $e->getMessage());
        }
    }
}
