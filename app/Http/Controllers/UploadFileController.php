<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class UploadFileController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $this->middleware('permission:blog-list', ['only' => ['index', 'show']]);
        $this->middleware('permission:blog-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:blog-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:blog-delete', ['only' => ['destroy']]);
    }

    /**
     * Upload multiple files
     *
     * @param string $type One of the following - `image` | `file` | `video`
     * @param string|array $paths
     * @return array An array of uploaded file paths
     */
    public function uploadMultiple($type, $request, $field_name)
    {
        $folder = "";
        $validation = "";

        // set folder and validation rule
        switch ($type) {
            case 'image':
                $folder = "upload.directories.course_image";
                $validation = "upload.restrictions.image";
                break;

            case 'file':
                $folder = "upload.directories.course_file";
                $validation = "upload.restrictions.file";
                break;

            case 'video':
                $folder = "upload.directories.course_video";
                $validation = "upload.restrictions.video";
                break;

            default:
                # if file type is none of these, consider as file
                $folder = "upload.directories.course_file";
                $validation = "upload.restrictions.file";
                break;
        }

        $folder = config($folder) . $request->user()->id;
        $request->validate([
            "$field_name.*" => config($validation),
        ]);

        $all_file_path = [];
        $files = $request->$field_name;

        if ($files) {
            foreach ($files as $file) {
                $all_file_path[] = $file instanceof UploadedFile ? $this->upload($file, $folder) : "";
            }
        }

        return $all_file_path;
    }

    /**
     * Upload multiple files
     *
     * @param Request $request
     * @param string $field_name
     * @param string $directory_name
     * @param string $type One of the following - `image` | `file` | `video`
     * @return array An array of uploaded file paths
     */
    public function uploadSingleFile($request, $field_name, $directory_name = 'course', $schoolKey = null)
    {
        $file = $request->file($field_name);
        $schoolKey = ($schoolKey != null) ? $schoolKey : getUserSchoolKey();
        if (!$file instanceof UploadedFile) {
            return;
        }
        $folder = "";
        $validation = "";
        $type = "file";
        $mimeType = $file->getClientMimeType();
        $fileName = $file->getClientOriginalName();
        if (str_contains($mimeType, 'image')) {
            $type = "image";
        } elseif (str_contains($mimeType, 'video')) {
            $type = "video";
        }

        // set folder and validation rule
        switch ($type) {
            case 'image':
                $folder = "upload.directories.{$directory_name}_image";
                $validation = "upload.restrictions.image";
                break;

            case 'file':
                $folder = "upload.directories.{$directory_name}_file";
                $validation = "upload.restrictions.file";
                break;

            case 'video':
                $folder = "upload.directories.{$directory_name}_video";
                $validation = "upload.restrictions.video";
                break;

            default:
                $folder = "upload.directories.{$directory_name}_file";
                $validation = "upload.restrictions.file";
                break;
        }

        $folder = $schoolKey . '/' . config($folder) . $request->user()->id;
        $request->validate([
            "$field_name.*" => config($validation),
        ]);

        $path = Storage::disk('s3')->put($folder, $file);
        $fileUrl = Storage::disk('s3')->url($path);

        return [
            'name' => "{$directory_name}_{$type}",
            'file_name' => $fileName,
            'path' => $fileUrl
        ];
    }


    /**
     * Upload resource file
     *
     * @param Request $request
     * @param int $index
     * @param string $field_name
     * @param string $directory_name
     * @param string $type One of the following - `image` | `file` | `video`
     * @return array An array of uploaded file paths
     */
    public function uploadResourceFile($request, $index, $field_name, $directory_name = 'resource', $schoolKey = null)
    {
        $file = $request->file('resources')[$index][$field_name];
        $schoolKey = ($schoolKey != null) ? $schoolKey : getUserSchoolKey();

        if (!$file instanceof UploadedFile) {
            return;
        }

        $folder = "";
        // $validation = "";
        $type = "file";
        $mimeType = $file->getClientMimeType();
        $fileName = $file->getClientOriginalName();

        if (str_contains($mimeType, 'image')) {
            $type = "image";
        } elseif (str_contains($mimeType, 'video')) {
            $type = "video";
        }

        // set folder and validation rule
        switch ($type) {
            case 'image':
                $folder = "upload.directories.{$directory_name}_image";
                // $validation = "upload.restrictions.image";
                break;

            case 'file':
                $folder = "upload.directories.{$directory_name}_file";
                // $validation = "upload.restrictions.file";
                break;

            case 'video':
                $folder = "upload.directories.{$directory_name}_video";
                // $validation = "upload.restrictions.video";
                break;

            default:
                $folder = "upload.directories.{$directory_name}_file";
                // $validation = "upload.restrictions.file";
                break;
        }

        $folder = $schoolKey . '/' . config($folder) . $request->user()->id;
        // $request->validate([
        //     "resources.*.$field_name" => config($validation),
        // ]);

        if ($mimeType === 'application/pdf') {
            $path = Storage::disk('s3')->putFileAs($folder, $file, $file->getClientOriginalName(), [
                'ContentType' => 'application/pdf',
            ]);
        } else {
            $path = Storage::disk('s3')->put($folder, $file);
        }

        $fileUrl = Storage::disk('s3')->url($path);

        return [
            'name' => "{$directory_name}_{$type}",
            'file_name' => $fileName,
            'path' => $fileUrl
        ];
    }

    /**
     * Upload Document file
     *
     * @param Request $request
     * @param int $index
     * @param string $field_name
     * @param string $directory_name
     * @param string $type One of the following - `image` | `file` | `video`
     * @return array An array of uploaded file paths
     */
    public function uploadDocumentFile($request, $index, $field_name, $directory_name = 'school', $schoolKey = null)
    {
        $file = $request->file('documents')[$index][$field_name];
        $schoolKey = ($schoolKey != null) ? $schoolKey : getUserSchoolKey();

        if (!$file instanceof UploadedFile) {
            return;
        }

        $folder = "";
        // $validation = "";
        $type = "file";
        $mimeType = $file->getClientMimeType();
        $fileName = $file->getClientOriginalName();

        if (str_contains($mimeType, 'image')) {
            $type = "image";
        } elseif (str_contains($mimeType, 'video')) {
            $type = "video";
        }

        // set folder and validation rule
        switch ($type) {
            case 'image':
                $folder = "upload.directories.{$directory_name}_image";
                // $validation = "upload.restrictions.image";
                break;

            case 'file':
                $folder = "upload.directories.{$directory_name}_file";
                // $validation = "upload.restrictions.file";
                break;

            case 'video':
                $folder = "upload.directories.{$directory_name}_video";
                // $validation = "upload.restrictions.video";
                break;

            default:
                $folder = "upload.directories.{$directory_name}_file";
                // $validation = "upload.restrictions.file";
                break;
        }

        $folder = $schoolKey . '/' . config($folder) . $request->user()->id;
        // $request->validate([
        //     "resources.*.$field_name" => config($validation),
        // ]);

        if ($mimeType === 'application/pdf') {
            $path = Storage::disk('s3')->putFileAs($folder, $file, $file->getClientOriginalName(), [
                'ContentType' => 'application/pdf',
            ]);
        } else {
            $path = Storage::disk('s3')->put($folder, $file);
        }

        $fileUrl = Storage::disk('s3')->url($path);

        return [
            'name' => "{$directory_name}_{$type}",
            'file_name' => $fileName,
            'path' => $fileUrl
        ];
    }


    /**
     * Upload multiple files
     *
     * @param Request $request
     * @param string $field_name
     * @param string $directory_name
     * @param string $type One of the following - `image` | `file` | `video`
     * @return array An array of uploaded file paths
     */
    public function uploadMultipleFiles($request, $field_name, $directory_name = 'course', $schoolKey = null)
    {
        $files = $request->$field_name;
        $all_file_path = [];
        $schoolKey = ($schoolKey != null) ? $schoolKey : getUserSchoolKey();

        if ($files) {
            dd($files);
            foreach ($files as $file) {
                dd($file);
                if (!$file instanceof UploadedFile) {
                    continue;
                }
                $folder = "";
                $validation = "";
                $type = "file";
                $mimeType = $file->getClientMimeType();
                $fileName = $file->getClientOriginalName();
                if (str_contains($mimeType, 'image')) {
                    $type = "image";
                } elseif (str_contains($mimeType, 'video')) {
                    $type = "video";
                }

                // set folder and validation rule
                switch ($type) {
                    case 'image':
                        $folder = "upload.directories.{$directory_name}_image";
                        $validation = "upload.restrictions.image";
                        break;

                    case 'file':
                        $folder = "upload.directories.{$directory_name}_file";
                        $validation = "upload.restrictions.file";
                        break;

                    case 'video':
                        $folder = "upload.directories.{$directory_name}_video";
                        $validation = "upload.restrictions.video";
                        break;

                    default:
                        $folder = "upload.directories.{$directory_name}_file";
                        $validation = "upload.restrictions.file";
                        break;
                }

                $folder = $schoolKey . '/' . config($folder) . $request->user()->id;
                $request->validate([
                    "$field_name.*" => config($validation),
                ]);

                $path = Storage::disk('s3')->put($folder, $file);
                $fileUrl = Storage::disk('s3')->url($path);

                $all_file_path[] = [
                    'name' => "{$directory_name}_{$type}",
                    'file_name' => $fileName,
                    'path' => $fileUrl
                ];
            }
        }

        return $all_file_path;
    }

    /**
     * Upload and update file
     *
     * @param Request $request
     * @return file url
     */
    public function uploadImage($request, $field_name, $directory_name = 'course_image', $schoolKey = null)
    {
        $schoolKey = ($schoolKey != null) ? $schoolKey : getUserSchoolKey();
        $folder = $schoolKey . '/' . config('upload.directories.' . $directory_name) . $request->user()->id;
        $request->validate([
            $field_name => config('upload.restrictions.image'),
        ]);
        $image = $request->file($field_name);
        $path = Storage::disk('s3')->put($folder, $image);
        $fileUrl = Storage::disk('s3')->url($path);

        return $fileUrl;
    }

    /**
     * Upload and update file
     *
     * @param Request $request
     * @return file url
     */
    public function uploadFile(Request $request, $field_name, $directory_name = 'course_image')
    {
        $folder = config('upload.directories.course_file') . $request->user()->id;
        $request->validate([
            $field_name => config('upload.restrictions.file'),
        ]);

        return $this->upload($request->file($field_name), $folder);
    }

    /**
     * Upload and update file
     *
     * @param Request $request
     * @return file url
     */
    public function uploadVideo(Request $request, $field_name, $directory_name = 'course_image')
    {
        $folder = config('upload.directories.course_video') . $request->user()->id;
        $request->validate([
            $field_name => config('upload.restrictions.video'),
        ]);

        return $this->upload($request->file($field_name), $folder);
    }

    /**
     * Uploads a file to the s3 bucket
     *
     * @param UploadedFile $uploadedFile
     * @param String $directory
     * @return string
     */
    private function upload(UploadedFile $uploadedFile, String $directory)
    {
        $filePath = $uploadedFile->storePublicly($directory, 'public');
        $fileUrl = Storage::disk('public')->url($filePath);
        //$fileUrl = Storage::disk('s3')->put('images/originals', $uploadedFile->file);
        return $filePath;
    }

    /**
     * Delete the file at a given path.
     *
     * @param string|array $paths
     * @return string
     */
    public function delete(array | string $paths)
    {
        return Storage::disk('public')->delete($paths);
    }
}
