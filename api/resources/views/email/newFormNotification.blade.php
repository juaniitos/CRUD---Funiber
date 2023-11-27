@component('mail::message')

<h1>Gracias {{ $nombre }}! </h1>
<p>Por enviar la información. En breve un asesor se comunicará contigo</p>

# Nuevo Formulario Recibido

**Área:** {{ $form->area }}
**Programa:** {{ $form->program }}
**Nombres:** {{ $form->names }}
**Apellidos:** {{ $form->last_names }}
**Email:** {{ $form->email }}
**Teléfono:** {{ $form->phone }}
**País:** {{ $form->country }}
**Estado:** {{ $form->state }}
**Ciudad:** {{ $form->city }}
**Comentarios:** {{ $form->comments }}

@component('mail::button', ['url' => 'https://www.funiber.org/'])
Ver página
@endcomponent

Gracias,<br>
{{config('app.name')}}
@endcomponent
