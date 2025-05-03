<x-mail::message>
# Parent Support Ticket.

Hello {{ $supportTicketData['student_name'] }},

We have received your Support Ticket with the following details:

### Support Details
- **Support Type**: {{ $supportTicketData['request_type'] }}
- **Support Date**: {{ $supportTicketData['request_date'] }}
- **Student Name**: {{ $supportTicketData['student_name'] }}
- **Parent Name**: {{ $supportTicketData['parent_name'] }}
- **Parent Solution Phone**: {{ $supportTicketData['parent_phone'] }}
- **Support Status**: {{ $supportTicketData['solution_status'] }}
- **Enquiry Message**:  
  {{ $supportTicketData['details'] }}

If you have any questions or need further assistance, please contact us.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

