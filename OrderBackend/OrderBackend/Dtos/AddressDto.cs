namespace OrderBackend.Dtos
{
    public class AddressDto
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public int PostCode { get; set; }
        public string Country { get; set; }
    }
}
