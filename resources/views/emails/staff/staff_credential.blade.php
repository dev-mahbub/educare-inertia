<!DOCTYPE html>
<html>

<head>
    <title></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }

        .content {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }

        .header {
            font-size: 1.5em;
            margin-bottom: 20px;
            color: #333;
        }

        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="content">
        <p class="header">Dear {{ $data['staff_name'] }},</p>
        <p>I hope this email finds you well.</p>
        <p>Please find below your login credentials for accessing [EduCare ERP/App]:</p>
        <ul>
            <li><strong>ERP Login Url:</strong> <a href="{{ $data['website_url'] }}" target="_blank">{{ $data['website_url'] }}</a></li>
            <li><strong>Mobile App Url:</strong> <a href="https://tinyurl.com/erpeducare" target="_blank">https://tinyurl.com/erpeducare</a></li>
            <li><strong>School Key:</strong> {{ $data['school_key'] }}</li>
            <li><strong>Username:</strong> {{ $data['username'] }}</li>
            <li><strong>Password:</strong> {{ $data['password'] }}</li>
        </ul>
        <p>Kindly keep this information confidential and avoid sharing it with unauthorized individuals. If you encounter any issues logging in or need further assistance, please do not hesitate to contact us.</p>
        <p>Thank you and welcome to {{ $data['school_name'] }}.</p>
        <p>Best regards,</p>
        <p>{{ $data['school_name'] }}</p>
    </div>
</body>

</html>