<?php

namespace App\Helpers;

use Carbon\Carbon;
use libphonenumber\NumberParseException;
use libphonenumber\PhoneNumberFormat;
use libphonenumber\PhoneNumberUtil;

class Formatter
{
    /**
     * @param float|null $number
     *
     * @return string
     */
    public static function moneyFormat(?float $number): string
    {
        return number_format($number, 2, ',', '.').' '.self::moneySymbol();
    }

    /**
     * @return string
     */
    public static function moneySymbol(): string
    {
        return 'rupi';
    }

    /**
     * @param float|null $number
     *
     * @return string
     */
    public static function percentageFormat(?float $number): string
    {
        return number_format($number, 2, ',', '.').self::percentageSymbol();
    }

    /**
     * @return string
     */
    public static function percentageSymbol(): string
    {
        return '%';
    }

    /**
     * @param float|null $number
     * @param int $decimals
     *
     * @return string
     */
    public static function numberFormat(?float $number, int $decimals = 2): string
    {
        if ((int)$number == $number) {
            return number_format($number, 0, ',', '.');
        }

        return number_format($number, $decimals, ',', '.');
    }

    /**
     * @param Carbon|string $expression
     *
     * @return string
     */
    public static function dateTimeFormat($expression): string
    {
        if ($expression instanceof Carbon) {
            return ($expression)->formatLocalized('%d.%m.%Y %H:%M');
        } 
        elseif (is_string($expression)) {
            return (string)date('d.m.Y H:i', strtotime($expression));
        }

        return '';
    }

    /**
     * @param Carbon|string $expression
     *
     * @return string
     */
    public static function dateTimeFormatLong($expression): string
    {
        if ($expression instanceof Carbon) {
            return ($expression)->formatLocalized('%a. %d. %B %Y %H:%M');
        } 
        elseif (is_string($expression)) {
            return (string)date('D. d. F Y H:i', strtotime($expression));
        }

        return '';
    }

    /**
     * @param Carbon|string $expression
     *
     * @return string
     */
    public static function dateTimeString($expression): string
    {
        if ($expression instanceof Carbon) {
            return ($expression)->toDateTimeString();
        } 
        elseif (is_string($expression)) {
            return (string)date('Y-m-d H:i:s', strtotime($expression));
        }

        return '';
    }

    /**
     * @param Carbon|string $expression
     *
     * @return string
     */
    public static function dateTimeLocalString($expression): string
    {
        if ($expression instanceof Carbon) {
            return ($expression)->toDateTimeLocalString();
        } 
        elseif (is_string($expression)) {
            return (string)date('Y-m-d\TH:i:s', strtotime($expression));
        }

        return '';
    }

    /**
     * @param Carbon|string $expression
     *
     * @return string
     */
    public static function dateFormat($expression): string
    {
        if ($expression instanceof Carbon) {
            return ($expression)->formatLocalized('%d.%m.%Y');
        } 
        elseif (is_string($expression)) {
            return (string)date('d.m.Y', strtotime($expression));
        }

        return '';
    }

    /**
     * @param Carbon|string $expression
     *
     * @return string
     */
    public static function dateFormatLong($expression): string
    {
        if ($expression instanceof Carbon) {
            return ($expression)->formatLocalized('%d. %b. %Y');
        } 
        elseif (is_string($expression)) {
            return (string)date('d. M. Y', strtotime($expression));
        }

        return '';
    }

    /**
     * @param Carbon|string $expression
     *
     * @return string
     */
    public static function monthYear($expression): string
    {
        if ($expression instanceof Carbon) {
            return ($expression)->formatLocalized('%b. %Y');
        } 
        elseif (is_string($expression)) {
            return (string)date('M. Y', strtotime($expression));
        }

        return '';
    }

    /**
     * @param Carbon|string $expression
     *
     * @return string
     */
    public static function dateString($expression): string
    {
        if ($expression instanceof Carbon) {
            return ($expression)->toDateString();
        } 
        elseif (is_string($expression)) {
            return (string)date('Y-m-d', strtotime($expression));
        }

        return '';
    }

    /**
     * @param Carbon|string $expression
     *
     * @return string
     */
    public static function timeFormat($expression): string
    {
        if ($expression instanceof Carbon) {
            return ($expression)->formatLocalized('%H:%M');
        } 
        elseif (is_string($expression)) {
            return (string)date('H:i', strtotime($expression));
        }

        return '';
    }


}
