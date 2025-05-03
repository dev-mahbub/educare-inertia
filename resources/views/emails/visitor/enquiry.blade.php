<x-mail::message>
# Visitor Enquiry

Hello {{ $visitorEnquiryData['name'] }},

We have received your enquiry with the following details:

### Enquiry Details
- **Enquiry Type**: {{ $visitorEnquiryData['enquiry_type'] }}
- **Phone**: {{ $visitorEnquiryData['phone'] }}
- **Email**: {{ $visitorEnquiryData['email'] }}
- **Enquiry Date**: {{ $visitorEnquiryData['enquiry_date'] }}
- **In Time**: {{ $visitorEnquiryData['in_time'] }}
- **Appointment Date**: {{ $visitorEnquiryData['appointment_date'] }}
- **Appointment Time**: {{ $visitorEnquiryData['appointment_time'] }}
- **Person to Meet**: {{ $visitorEnquiryData['person_to_meet'] }}
- **Purpose of Visit**: {{ $visitorEnquiryData['purpose_of_visit'] }}
- **Vehicle No.**: {{ $visitorEnquiryData['vehicle_no'] }}
- **Enquiry Message**:  
  {{ $visitorEnquiryData['enquiry_message'] }}
- **Address**: {{ $visitorEnquiryData['address'] }}

If you have any questions or need further assistance, please contact us.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

